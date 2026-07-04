/* =========================================================
   SCRIPT.JS
   Engine chính: render UI, xử lý filter/search, quiz, progress,
   dark mode, copy code, run demo. Không dùng eval/Function.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- STATE ---------- */
  const STORAGE_KEYS = {
    theme: "leetcode-teacher-theme",
    progress: "leetcode-teacher-progress" // { patternId: true }
  };

  let state = {
    currentView: "home",       // home | pattern | glossary | progress
    currentPatternId: null,
    difficultyFilter: "all",
    searchQuery: ""
  };

  /* ---------- DOM SHORTCUTS ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $all = (sel) => Array.from(document.querySelectorAll(sel));

  const el = {
    sidebar: $("#sidebar"),
    sidebarToggle: $("#sidebarToggle"),
    sidebarOverlay: $("#sidebarOverlay"),
    themeToggle: $("#themeToggle"),
    searchInput: $("#searchInput"),
    filterDifficulty: $("#filterDifficulty"),
    patternNav: $("#patternNav"),
    patternGrid: $("#patternGrid"),
    patternDetail: $("#patternDetail"),
    progressSummary: $("#progressSummary"),
    progressDetail: $("#progressDetail"),
    glossaryGrid: $("#glossaryGrid"),
    glossarySearch: $("#glossarySearch"),
    resetProgressBtn: $("#resetProgressBtn"),
    toast: $("#toast"),
    views: {
      home: $("#view-home"),
      pattern: $("#view-pattern"),
      glossary: $("#view-glossary"),
      progress: $("#view-progress"),
      empty: $("#view-empty")
    }
  };

  /* =========================================================
     PROGRESS (localStorage)
     ========================================================= */
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.progress);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
    } catch (e) {
      // localStorage có thể bị chặn (chế độ ẩn danh) — bỏ qua yên lặng
    }
  }

  function isPatternDone(patternId) {
    const progress = loadProgress();
    return !!progress[patternId];
  }

  function togglePatternDone(patternId) {
    const progress = loadProgress();
    progress[patternId] = !progress[patternId];
    saveProgress(progress);
    return progress[patternId];
  }

  function resetAllProgress() {
    saveProgress({});
  }

  /* =========================================================
     THEME (dark/light mode)
     ========================================================= */
  function loadTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.theme) || "light";
    } catch (e) {
      return "light";
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    el.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    el.themeToggle.setAttribute("aria-label", theme === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối");
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch (e) { /* bỏ qua */ }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* =========================================================
     TOAST
     ========================================================= */
  let toastTimer = null;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), 1800);
  }

  /* =========================================================
     UTIL
     ========================================================= */
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function badgeForDifficulty(diff) {
    const cls = diff === "Easy" ? "badge-easy" : "badge-medium";
    return `<span class="badge ${cls}">${diff}</span>`;
  }

  function countDoneInPatterns() {
    const progress = loadProgress();
    return PATTERNS.filter(p => progress[p.id]).length;
  }

  /* =========================================================
     VIEW ROUTING
     ========================================================= */
  function showView(viewName) {
    Object.keys(el.views).forEach((key) => {
      el.views[key].classList.toggle("hidden", key !== viewName);
    });
    state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    closeSidebarOnMobile();
  }

  function navigateHome() {
    state.currentPatternId = null;
    renderHome();
    showView("home");
    highlightActiveNavItem();
  }

  function navigateToPattern(patternId) {
    state.currentPatternId = patternId;
    renderPatternDetail(patternId);
    showView("pattern");
    highlightActiveNavItem();
  }

  function navigateToGlossary() {
    renderGlossary();
    showView("glossary");
    highlightActiveNavItem();
  }

  function navigateToProgress() {
    renderProgressView();
    showView("progress");
    highlightActiveNavItem();
  }

  /* =========================================================
     SIDEBAR (mobile toggle)
     ========================================================= */
  function openSidebar() {
    el.sidebar.classList.add("open");
    el.sidebarOverlay.classList.add("show");
  }
  function closeSidebar() {
    el.sidebar.classList.remove("open");
    el.sidebarOverlay.classList.remove("show");
  }
  function closeSidebarOnMobile() {
    if (window.innerWidth <= 900) closeSidebar();
  }

  /* =========================================================
     RENDER: SIDEBAR PATTERN NAV
     ========================================================= */
  function renderPatternNav() {
    const progress = loadProgress();
    el.patternNav.innerHTML = PATTERNS.map((p) => {
      const done = !!progress[p.id];
      return `
        <button class="pattern-nav-item" data-pattern-id="${p.id}">
          <span class="nav-check">${done ? "✓" : ""}</span>
          <span>${escapeHtml(p.name)}</span>
        </button>
      `;
    }).join("");

    $all(".pattern-nav-item").forEach((btn) => {
      btn.addEventListener("click", () => navigateToPattern(btn.dataset.patternId));
    });
  }

  function highlightActiveNavItem() {
    $all(".pattern-nav-item").forEach((btn) => {
      btn.classList.toggle("active", state.currentView === "pattern" && btn.dataset.patternId === state.currentPatternId);
    });
  }

  /* =========================================================
     RENDER: HOME (pattern grid + progress summary)
     ========================================================= */
  function getFilteredPatterns() {
    const q = state.searchQuery.trim().toLowerCase();
    return PATTERNS.filter((p) => {
      const matchesDifficulty = state.difficultyFilter === "all" || p.difficultyTag === state.difficultyFilter;
      if (!matchesDifficulty) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.shortDesc,
        p.difficultyTag,
        ...p.examples.map(e => e.name)
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }

  function renderProgressSummary() {
    const done = countDoneInPatterns();
    const total = PATTERNS.length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    el.progressSummary.innerHTML = `
      <div class="progress-stat"><div class="num">${done}/${total}</div><div class="label">Pattern đã học</div></div>
      <div class="progress-stat"><div class="num">${pct}%</div><div class="label">Hoàn thành</div></div>
    `;
  }

  function renderHome() {
    renderProgressSummary();
    const filtered = getFilteredPatterns();
    const progress = loadProgress();

    if (filtered.length === 0) {
      el.patternGrid.innerHTML = "";
      showView("empty");
      return;
    }

    el.patternGrid.innerHTML = filtered.map((p) => {
      const done = !!progress[p.id];
      return `
        <button class="pattern-card" data-pattern-id="${p.id}" aria-label="Xem chi tiết pattern ${escapeHtml(p.name)}">
          <div class="pattern-card-top">
            <h3>${escapeHtml(p.name)}</h3>
            <span class="done-check ${done ? "done" : ""}">${done ? "✓" : ""}</span>
          </div>
          <p class="desc">${escapeHtml(p.shortDesc)}</p>
          <div class="pattern-card-meta">
            ${badgeForDifficulty(p.difficultyTag)}
            <span class="badge badge-count">${p.examples.length} bài ví dụ</span>
          </div>
        </button>
      `;
    }).join("");

    $all(".pattern-card").forEach((card) => {
      card.addEventListener("click", () => navigateToPattern(card.dataset.patternId));
    });
  }

  /* =========================================================
     RENDER: PATTERN DETAIL
     ========================================================= */
  function renderPatternDetail(patternId) {
    const p = PATTERNS.find((x) => x.id === patternId);
    if (!p) {
      el.patternDetail.innerHTML = `<p>Không tìm thấy pattern này.</p>`;
      return;
    }
    const done = isPatternDone(p.id);

    el.patternDetail.innerHTML = `
      <div class="detail-header">
        <div>
          <h1>${escapeHtml(p.name)}</h1>
          <div class="pattern-card-meta">${badgeForDifficulty(p.difficultyTag)}</div>
        </div>
        <button class="mark-done-btn ${done ? "active" : ""}" id="markDoneBtn">
          ${done ? "✓ Đã học xong" : "Đánh dấu đã học"}
        </button>
      </div>

      <div class="tabs">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="idea">Ý tưởng</button>
          <button class="tab-btn" data-tab="code">Code</button>
          <button class="tab-btn" data-tab="complexity">Complexity</button>
          <button class="tab-btn" data-tab="similar">Bài tương tự</button>
        </div>

        <div class="tab-panel" data-panel="idea">
          <div class="info-block">
            <h3>📌 Định nghĩa</h3>
            <p>${escapeHtml(p.definition)}</p>
          </div>
          <div class="info-block">
            <h3>🔍 Dấu hiệu nhận biết</h3>
            <ul>${p.signals.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
          </div>
          <div class="info-block">
            <h3>✅ Khi nào nên dùng</h3>
            <p>${escapeHtml(p.whenToUse)}</p>
          </div>
          <div class="warning-block">
            <h3>⚠️ Lỗi sai thường gặp</h3>
            <ul>${p.commonMistakes.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
          </div>
          <div class="info-block">
            <h3>🧠 Template suy nghĩ</h3>
            <p>${escapeHtml(p.thinkingTemplate)}</p>
          </div>

          <h2 class="section-heading">Bài tập tương tự cùng pattern</h2>
          <div class="example-list">
            ${p.examples.map(ex => `
              <div class="example-card">
                <div class="example-card-title">
                  <span>${escapeHtml(ex.name)}</span>
                  ${badgeForDifficulty(ex.difficulty)}
                </div>
                <p class="muted" style="margin:0;">${escapeHtml(ex.note)}</p>
              </div>
            `).join("")}
          </div>

          ${renderWalkthroughSection(p)}
        </div>

        <div class="tab-panel hidden" data-panel="code">
          <h2 class="section-heading">Template code</h2>
          ${renderCodeBlock(p.codeTemplate, "js-template-" + p.id)}

          <h2 class="section-heading">Code lời giải bài đại diện: ${escapeHtml(p.walkthrough.problemName)}</h2>
          ${renderCodeBlock(p.walkthrough.code, "js-solution-" + p.id)}

          ${renderDemoSection(p)}
        </div>

        <div class="tab-panel hidden" data-panel="complexity">
          <h2 class="section-heading">Phân tích độ phức tạp — ${escapeHtml(p.walkthrough.problemName)}</h2>
          <div class="complexity-grid">
            <div class="complexity-card">
              <div class="cx-label">Time Complexity</div>
              <div class="cx-value">${escapeHtml(p.complexity.time)}</div>
              <p class="cx-desc">${escapeHtml(p.complexity.timeDesc)}</p>
            </div>
            <div class="complexity-card">
              <div class="cx-label">Space Complexity</div>
              <div class="cx-value">${escapeHtml(p.complexity.space)}</div>
              <p class="cx-desc">${escapeHtml(p.complexity.spaceDesc)}</p>
            </div>
          </div>
          <div class="info-block">
            <h3>Chi tiết bài đại diện</h3>
            <p><strong>Time:</strong> ${escapeHtml(p.walkthrough.timeComplexity)}</p>
            <p style="margin-bottom:0;"><strong>Space:</strong> ${escapeHtml(p.walkthrough.spaceComplexity)}</p>
          </div>
        </div>

        <div class="tab-panel hidden" data-panel="similar">
          <h2 class="section-heading">Luyện tiếp các bài tương tự</h2>
          <div class="tag-list">
            ${p.walkthrough.similar.map(s => `<span class="tag-pill">${escapeHtml(s)}</span>`).join("")}
          </div>
          <h2 class="section-heading" style="margin-top:20px;">Toàn bộ ví dụ của pattern này</h2>
          <div class="tag-list">
            ${p.examples.map(ex => `<span class="tag-pill">${escapeHtml(ex.name)} (${ex.difficulty})</span>`).join("")}
          </div>
        </div>
      </div>

      <h2 class="section-heading">Quiz nhanh</h2>
      <div id="quizContainer-${p.id}"></div>
    `;

    // Gắn sự kiện tab
    $all(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $all(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tabKey = btn.dataset.tab;
        $all(".tab-panel").forEach((panel) => {
          panel.classList.toggle("hidden", panel.dataset.panel !== tabKey);
        });
      });
    });

    // Gắn sự kiện nút đánh dấu đã học
    $("#markDoneBtn").addEventListener("click", () => {
      const nowDone = togglePatternDone(p.id);
      showToast(nowDone ? "Đã đánh dấu hoàn thành! 🎉" : "Đã bỏ đánh dấu hoàn thành");
      renderPatternNav();
      renderPatternDetail(p.id); // re-render để cập nhật nút
      highlightActiveNavItem();
    });

    // Gắn copy button
    attachCopyButtons();

    // Gắn demo run button
    attachDemoHandlers(p);

    // Render quiz
    renderQuiz(p, `quizContainer-${p.id}`);
  }

  function renderWalkthroughSection(p) {
    const w = p.walkthrough;
    return `
      <h2 class="section-heading">Giải thích từng bước — bài đại diện</h2>
      <div class="info-block">
        <h3>📋 ${escapeHtml(w.problemName)} <span style="margin-left:8px;">${badgeForDifficulty(w.difficulty)}</span></h3>
        <p><strong>Đề bài:</strong> ${escapeHtml(w.summary)}</p>
        <pre style="margin-top:8px;"><code>${escapeHtml(w.ioExample)}</code></pre>
      </div>
      <div class="info-block">
        <h3>🐢 Cách nghĩ Brute Force</h3>
        <p style="margin-bottom:0;">${escapeHtml(w.bruteForce)}</p>
      </div>
      <div class="info-block">
        <h3>🚀 Cách tối ưu</h3>
        <p style="margin-bottom:0;">${escapeHtml(w.optimized)}</p>
      </div>
      <div class="step-list">
        ${w.steps.map((step, i) => `
          <div class="step-item">
            <div class="step-num">${i + 1}</div>
            <p>${escapeHtml(step)}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderCodeBlock(code, uniqueId) {
    return `
      <div class="code-block-wrap">
        <button class="copy-btn" data-copy-target="${uniqueId}">Copy</button>
        <pre><code id="${uniqueId}">${escapeHtml(code)}</code></pre>
      </div>
    `;
  }

  function renderDemoSection(p) {
    if (!p.demo) return "";
    return `
      <div class="demo-box">
        <h3 style="margin-bottom:8px;">▶️ Run demo</h3>
        <p class="muted" style="margin-bottom:8px;">${escapeHtml(p.demo.description)}</p>
        <input type="text" class="search-input search-input-block" id="demoInput-${p.id}" value="${escapeHtml(p.demo.defaultInput)}" style="margin:0 0 8px 0;">
        <button class="demo-run-btn" id="demoRunBtn-${p.id}">Chạy demo</button>
        <p class="demo-warning">Demo chạy trực tiếp bằng JavaScript có sẵn trong trang (không dùng eval/Function), chỉ minh họa với input bạn nhập, chạy hoàn toàn local trên trình duyệt của bạn.</p>
        <pre class="demo-output" id="demoOutput-${p.id}"></pre>
      </div>
    `;
  }

  function attachDemoHandlers(p) {
    if (!p.demo) return;
    const btn = $("#demoRunBtn-" + p.id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const input = $("#demoInput-" + p.id);
      const output = $("#demoOutput-" + p.id);
      try {
        const result = p.demo.fn(input.value);
        output.textContent = result;
        output.classList.add("show");
      } catch (e) {
        output.textContent = "Lỗi khi chạy demo: " + e.message;
        output.classList.add("show");
      }
    });
  }

  function attachCopyButtons() {
    $all(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.copyTarget;
        const codeEl = document.getElementById(targetId);
        if (!codeEl) return;
        const text = codeEl.textContent;

        const doCopySuccess = () => {
          const original = btn.textContent;
          btn.textContent = "Đã copy!";
          showToast("Đã copy code vào clipboard");
          setTimeout(() => { btn.textContent = original; }, 1500);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(doCopySuccess).catch(() => {
            fallbackCopy(text, doCopySuccess);
          });
        } else {
          fallbackCopy(text, doCopySuccess);
        }
      });
    });
  }

  function fallbackCopy(text, onSuccess) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      onSuccess();
    } catch (e) {
      showToast("Không thể copy tự động, vui lòng copy thủ công.");
    }
  }

  /* =========================================================
     QUIZ
     ========================================================= */
  function renderQuiz(p, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = p.quiz.map((q, qIndex) => `
      <div class="quiz-block" data-quiz-index="${qIndex}">
        <div class="quiz-question">Câu ${qIndex + 1}: ${escapeHtml(q.q)}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oIndex) => `
            <button class="quiz-option" data-option-index="${oIndex}">${escapeHtml(opt)}</button>
          `).join("")}
        </div>
        <div class="quiz-explain" data-explain></div>
      </div>
    `).join("");

    container.querySelectorAll(".quiz-block").forEach((block) => {
      const qIndex = Number(block.dataset.quizIndex);
      const question = p.quiz[qIndex];
      const optionBtns = block.querySelectorAll(".quiz-option");
      const explainEl = block.querySelector("[data-explain]");

      optionBtns.forEach((optBtn) => {
        optBtn.addEventListener("click", () => {
          const chosenIndex = Number(optBtn.dataset.optionIndex);
          // vô hiệu hóa tất cả để tránh chọn lại
          optionBtns.forEach((b) => { b.disabled = true; });

          optionBtns.forEach((b, i) => {
            if (i === question.correctIndex) {
              b.classList.add("correct");
            } else if (i === chosenIndex && chosenIndex !== question.correctIndex) {
              b.classList.add("incorrect");
            }
          });

          explainEl.textContent = (chosenIndex === question.correctIndex ? "✅ Chính xác! " : "❌ Chưa đúng. ") + question.explain;
          explainEl.classList.add("show");
        });
      });
    });
  }

  /* =========================================================
     RENDER: GLOSSARY
     ========================================================= */
  function renderGlossary(query) {
    const q = (query || "").trim().toLowerCase();
    const filtered = GLOSSARY.filter((g) => {
      if (!q) return true;
      return (g.term + " " + g.meaning).toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      el.glossaryGrid.innerHTML = `<p class="muted">Không tìm thấy thuật ngữ phù hợp.</p>`;
      return;
    }

    el.glossaryGrid.innerHTML = filtered.map((g) => `
      <div class="glossary-card">
        <h3>${escapeHtml(g.term)}</h3>
        <p style="margin-bottom:8px;">${escapeHtml(g.meaning)}</p>
        <div class="g-example"><span class="g-label">Ví dụ</span><br>${escapeHtml(g.example)}</div>
        <p class="g-when"><span class="g-label">Khi nào gặp:</span> ${escapeHtml(g.when)}</p>
      </div>
    `).join("");
  }

  /* =========================================================
     RENDER: PROGRESS VIEW
     ========================================================= */
  function renderProgressView() {
    const progress = loadProgress();
    const done = countDoneInPatterns();
    const total = PATTERNS.length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    const rows = PATTERNS.map((p) => {
      const isDone = !!progress[p.id];
      return `
        <div class="progress-row">
          <span>${escapeHtml(p.name)}</span>
          <span class="badge ${isDone ? "badge-easy" : "badge-count"}">${isDone ? "✓ Đã học" : "Chưa học"}</span>
        </div>
      `;
    }).join("");

    el.progressDetail.innerHTML = `
      <div class="info-block">
        <h3>Tổng quan</h3>
        <p>Bạn đã hoàn thành ${done}/${total} pattern (${pct}%).</p>
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="info-block">
        <h3>Chi tiết từng pattern</h3>
        ${rows}
      </div>
    `;
  }

  /* =========================================================
     EVENT BINDINGS (chung, không đổi theo view)
     ========================================================= */
  function bindGlobalEvents() {
    el.sidebarToggle.addEventListener("click", () => {
      if (el.sidebar.classList.contains("open")) closeSidebar();
      else openSidebar();
    });
    el.sidebarOverlay.addEventListener("click", closeSidebar);

    el.themeToggle.addEventListener("click", toggleTheme);

    el.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.currentView !== "home") navigateHome();
      else renderHome();
    });

    el.filterDifficulty.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.difficultyFilter = chip.dataset.filterValue;
        el.filterDifficulty.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        if (state.currentView !== "home") navigateHome();
        else renderHome();
      });
    });

    $all('[data-view="glossary"]').forEach(btn => btn.addEventListener("click", navigateToGlossary));
    $all('[data-view="progress"]').forEach(btn => btn.addEventListener("click", navigateToProgress));

    $("#backToHome").addEventListener("click", navigateHome);
    $("#backToHomeFromGlossary").addEventListener("click", navigateHome);
    $("#backToHomeFromProgress").addEventListener("click", navigateHome);

    el.glossarySearch.addEventListener("input", (e) => renderGlossary(e.target.value));

    el.resetProgressBtn.addEventListener("click", () => {
      const confirmed = window.confirm("Bạn chắc chắn muốn reset toàn bộ tiến độ học tập? Hành động này không thể hoàn tác.");
      if (!confirmed) return;
      resetAllProgress();
      showToast("Đã reset tiến độ học tập.");
      renderPatternNav();
      if (state.currentView === "home") renderHome();
      if (state.currentView === "pattern" && state.currentPatternId) renderPatternDetail(state.currentPatternId);
      if (state.currentView === "progress") renderProgressView();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeSidebar();
    });
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    applyTheme(loadTheme());
    renderPatternNav();
    bindGlobalEvents();
    navigateHome();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
