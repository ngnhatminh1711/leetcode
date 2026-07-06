/* =========================================================
   DATA.JS
   Toàn bộ nội dung bài học: pattern, ví dụ, quiz, từ điển thuật ngữ.
   Tách riêng khỏi script.js để dễ đọc và dễ thêm nội dung mới (DRY).
   ========================================================= */

const PATTERNS = [

/* ================= 1. ARRAY BASICS ================= */
{
  id: "array-basics",
  name: "Array Basics",
  shortDesc: "Duyệt, biến đổi và thao tác trên mảng — nền tảng của gần như mọi bài LeetCode.",
  difficultyTag: "Easy",
  definition: "Array Basics là nhóm kỹ thuật xử lý mảng cơ bản: duyệt một lần (single pass), theo dõi giá trị lớn nhất/nhỏ nhất khi đi qua mảng, và cộng dồn (running sum/running max) mà không cần vòng lặp lồng nhau.",
  signals: [
    "Đề bài cho một mảng số và hỏi về giá trị lớn nhất, nhỏ nhất, hoặc tổng.",
    "Có từ khóa như 'liên tiếp' (subarray/contiguous), 'tại thời điểm i'.",
    "Có thể giải bằng cách chỉ đi qua mảng một lần, cập nhật vài biến."
  ],
  whenToUse: "Dùng khi bài toán chỉ cần nhìn từng phần tử một lần theo thứ tự, và quyết định tại mỗi bước chỉ phụ thuộc vào 1-2 giá trị đã lưu trước đó (không cần nhìn lại toàn bộ mảng).",
  commonMistakes: [
    "Dùng vòng lặp lồng nhau (O(n²)) khi thực ra chỉ cần một vòng lặp O(n).",
    "Quên xử lý mảng rỗng hoặc mảng chỉ có 1 phần tử.",
    "Khởi tạo giá trị min/max sai (ví dụ khởi tạo max = 0 trong khi mảng có thể toàn số âm)."
  ],
  thinkingTemplate: "Hỏi: Tại vị trí i, mình cần biết gì từ các phần tử trước đó để ra quyết định? Nếu câu trả lời chỉ là '1-2 con số đã cập nhật dần' (ví dụ: tổng nhỏ nhất đã thấy, giá lớn nhất đã thấy) thì đây là dấu hiệu chỉ cần một vòng lặp duy nhất.",
  codeTemplate: `public class ArrayScanTemplate {
    public static int arrayScan(int[] nums) {
        // Bước 1: khởi tạo biến theo dõi (ví dụ: best, current)
        int best = nums[0];
        int current = nums[0];

        // Bước 2: duyệt một lần qua mảng
        for (int i = 1; i < nums.length; i++) {
            // Bước 3: cập nhật "current" dựa trên phần tử hiện tại
            current = Math.max(nums[i], current + nums[i]);
            // Bước 4: cập nhật "best" nếu current tốt hơn
            best = Math.max(best, current);
        }

        return best;
    }
}`,
  examples: [
    { name: "Two Sum", difficulty: "Easy", note: "Tìm 2 số có tổng bằng target — thường giải bằng Hash Map, nhưng bản chất vẫn là duyệt mảng một lần.", hint: "Với mỗi phần tử, số còn thiếu để đạt target là (target - nums[i]). Có cần tra cứu nhanh xem số đó đã xuất hiện chưa không?" },
    { name: "Best Time to Buy and Sell Stock", difficulty: "Easy", note: "Theo dõi giá thấp nhất đã thấy và lợi nhuận lớn nhất — kinh điển của kỹ thuật running min/max.", hint: "Duyệt qua giá từng ngày, luôn nhớ giá thấp nhất đã gặp. Tại mỗi ngày, nếu bán ra hôm nay thì lời bao nhiêu so với giá thấp nhất đó?" },
    { name: "Contains Duplicate", difficulty: "Easy", note: "Duyệt mảng, dùng Set để phát hiện phần tử trùng lặp.", hint: "Có cấu trúc dữ liệu nào giúp kiểm tra 'phần tử này đã gặp chưa' trong O(1) không? Nếu gặp lại phần tử đã có trong đó, dừng ngay." },
    { name: "Maximum Subarray", difficulty: "Medium", note: "Bài đại diện bên dưới — thuật toán Kadane's.", hint: "Tại mỗi vị trí, tự hỏi: cộng phần tử này vào dãy đang có thì lợi hơn, hay bắt đầu dãy mới từ đây thì lợi hơn? So sánh 2 lựa chọn đó." },
    { name: "Move Zeroes", difficulty: "Easy", note: "Di chuyển tất cả số 0 về cuối mảng, giữ nguyên thứ tự các số khác, làm tại chỗ (in-place).", hint: "Dùng 1 con trỏ đánh dấu 'vị trí tiếp theo để đặt số khác 0'. Duyệt mảng, mỗi khi gặp số khác 0, đưa nó về vị trí con trỏ rồi tăng con trỏ lên." },
    { name: "Plus One", difficulty: "Easy", note: "Một số lớn được biểu diễn dưới dạng mảng các chữ số, cộng thêm 1 vào số đó.", hint: "Cộng 1 giống như cộng tay từ phải sang trái: nếu chữ số hiện tại là 9, nó trở thành 0 và phải 'nhớ' 1 sang chữ số bên trái. Chuyện gì xảy ra nếu mọi chữ số đều là 9?" },
    { name: "Majority Element", difficulty: "Easy", note: "Tìm phần tử xuất hiện nhiều hơn n/2 lần trong mảng — có thể giải bằng đếm tần suất hoặc thuật toán Boyer-Moore Voting.", hint: "Cách đơn giản nhất: đếm tần suất bằng Hash Map rồi tìm phần tử có count lớn nhất. Có cách nào không cần thêm bộ nhớ không? (gợi ý: nghĩ về 'phiếu bầu' — mỗi phần tử giống nhau +1 phiếu, khác nhau -1 phiếu)" }
  ],
  walkthrough: {
    problemName: "Maximum Subarray",
    difficulty: "Medium",
    summary: "Cho một mảng số nguyên nums, tìm dãy con liên tiếp (contiguous subarray) có tổng lớn nhất, trả về tổng đó.",
    ioExample: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nGiải thích: dãy con [4,-1,2,1] có tổng lớn nhất = 6",
    bruteForce: "Thử tất cả các dãy con có thể (2 vòng lặp lồng nhau để chọn điểm bắt đầu và kết thúc), tính tổng từng dãy rồi so sánh. Độ phức tạp O(n²) — chấp nhận được với mảng nhỏ nhưng chậm với mảng lớn.",
    optimized: "Thuật toán Kadane's: đi qua mảng một lần. Tại mỗi vị trí, tự hỏi 'cộng phần tử hiện tại vào dãy đang có lợi hơn, hay bắt đầu dãy mới từ đây có lợi hơn?'. Nếu tổng dãy hiện tại (current) đã âm, nó chỉ kéo tổng xuống — nên bỏ, bắt đầu lại từ phần tử hiện tại.",
    steps: [
      "Khởi tạo current = nums[0] và best = nums[0] (dãy con nhỏ nhất là chính phần tử đầu tiên).",
      "Duyệt từ phần tử thứ 2: so sánh current + nums[i] với nums[i] một mình — chọn giá trị lớn hơn làm current mới.",
      "Sau khi cập nhật current, so sánh với best — nếu current lớn hơn thì cập nhật best.",
      "Lặp lại đến hết mảng, trả về best."
    ],
    code: `public class Solution {
    public static int maxSubArray(int[] nums) {
        int current = nums[0];
        int best = nums[0];

        for (int i = 1; i < nums.length; i++) {
            // Nếu current đang âm, nó kéo tổng xuống -> bắt đầu lại từ nums[i]
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }

        return best;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubArray(nums)); // 6
    }
}`,
    timeComplexity: "O(n) — chỉ duyệt mảng một lần.",
    spaceComplexity: "O(1) — chỉ dùng 2 biến, không cần thêm cấu trúc dữ liệu.",
    similar: ["Best Time to Buy and Sell Stock", "House Robber", "Maximum Product Subarray"]
  },
  demo: {
    description: "Chạy thử Maximum Subarray với input tự chọn (mảng số, cách nhau bởi dấu phẩy).",
    defaultInput: "-2,1,-3,4,-1,2,1,-5,4",
    fn: (inputStr) => {
      const nums = inputStr.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (nums.length === 0) return "Vui lòng nhập ít nhất 1 số.";
      let current = nums[0], best = nums[0];
      for (let i = 1; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        best = Math.max(best, current);
      }
      return `Input: [${nums.join(",")}]\nKết quả (tổng dãy con lớn nhất): ${best}`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Duyệt mảng một lần duy nhất.",
    space: "O(1)",
    spaceDesc: "Chỉ dùng vài biến để theo dõi trạng thái."
  },
  quiz: [
    {
      q: "Vì sao Kadane's Algorithm chỉ cần O(n) thay vì O(n²)?",
      options: [
        "Vì nó dùng đệ quy để giảm số bước lặp",
        "Vì tại mỗi bước, nó chỉ cần quyết định dựa trên 1 giá trị current đã lưu, không cần thử lại các dãy con trước đó",
        "Vì JavaScript tối ưu vòng lặp tự động",
        "Vì nó sắp xếp mảng trước khi duyệt"
      ],
      correctIndex: 1,
      explain: "Chìa khóa là: quyết định 'giữ dãy cũ hay bắt đầu dãy mới' chỉ cần biết current — một con số duy nhất — nên không cần duyệt lại các dãy con đã xét."
    },
    {
      q: "Nếu mảng toàn số âm, ví dụ [-3,-1,-5], Maximum Subarray trả về gì?",
      options: ["0 (dãy rỗng)", "-1 (số âm lớn nhất, tức ít âm nhất)", "-9 (tổng cả mảng)", "Lỗi vì không có dãy con dương"],
      correctIndex: 1,
      explain: "Bài toán yêu cầu dãy con phải có ít nhất 1 phần tử, nên kết quả là -1 — phần tử 'ít âm nhất', không phải 0."
    }
  ]
},

/* ================= 2. HASH MAP / FREQUENCY COUNTER ================= */
{
  id: "hashmap",
  name: "Hash Map / Frequency Counter",
  shortDesc: "Dùng Map/Object để tra cứu và đếm tần suất trong O(1), thay vì duyệt lại toàn bộ mảng.",
  difficultyTag: "Easy",
  definition: "Frequency Counter là kỹ thuật dùng Hash Map (hoặc Object trong JS) để lưu lại thông tin đã thấy — thường là số lần xuất hiện hoặc chỉ số (index) — để tra cứu gần như O(1) thay vì phải duyệt lại mảng mỗi lần cần tìm.",
  signals: [
    "Đề bài yêu cầu tìm cặp/nhóm phần tử thỏa điều kiện tổng, hiệu, hoặc giống nhau.",
    "Có từ 'đếm số lần xuất hiện', 'phần tử xuất hiện nhiều nhất', 'anagram', 'trùng lặp'.",
    "Cách giải brute-force của bạn có 2 vòng lặp lồng nhau để 'tìm phần tử còn thiếu'."
  ],
  whenToUse: "Dùng khi bạn cần tra cứu nhanh 'phần tử này đã xuất hiện chưa / xuất hiện bao nhiêu lần / ở vị trí nào' mà không muốn duyệt lại toàn bộ mảng mỗi lần hỏi.",
  commonMistakes: [
    "Dùng object nhưng quên kiểm tra hasOwnProperty hoặc dùng sai giá trị mặc định khi key chưa tồn tại.",
    "Duyệt mảng 2 lần không cần thiết khi có thể vừa xây map vừa kiểm tra trong 1 lần duyệt.",
    "Quên rằng object key trong JS luôn là string, có thể gây lỗi khi key là số hoặc object phức tạp."
  ],
  thinkingTemplate: "Đọc câu 'tìm 2 số có tổng bằng target', ta tự hỏi: với mỗi số hiện tại, số còn thiếu để đạt target là gì (target - nums[i])? Nếu tra cứu được ngay bằng map thì mỗi lần kiểm tra gần như O(1), thay vì phải duyệt lại từ đầu.",
  codeTemplate: `import java.util.HashMap;
import java.util.Map;

public class FrequencyCounterTemplate {
    public static Map<Integer, Integer> countFrequency(int[] items) {
        Map<Integer, Integer> map = new HashMap<>();

        // Bước 1: xây map (đếm tần suất hoặc lưu index)
        for (int item : items) {
            map.put(item, map.getOrDefault(item, 0) + 1);
        }

        // Bước 2: dùng map để tra cứu nhanh
        for (int item : items) {
            if (map.get(item) > 1) {
                // xử lý khi gặp phần tử trùng
            }
        }

        return map;
    }
}`,
  examples: [
    { name: "Two Sum", difficulty: "Easy", note: "Bài đại diện bên dưới — vừa duyệt vừa tra map.", hint: "Với mỗi số, tính complement = target - nums[i]. Tra map xem complement đã xuất hiện chưa trước khi thêm số hiện tại vào map." },
    { name: "Valid Anagram", difficulty: "Easy", note: "Đếm tần suất ký tự của 2 chuỗi, so sánh 2 map.", hint: "Nếu 2 chuỗi là anagram của nhau, chúng phải có cùng tần suất từng ký tự. Đếm ký tự chuỗi 1 (+1), đếm ký tự chuỗi 2 (-1), cuối cùng mọi giá trị trong map phải bằng 0." },
    { name: "Group Anagrams", difficulty: "Medium", note: "Dùng chuỗi đã sắp xếp làm key để nhóm các anagram lại.", hint: "Mọi anagram của nhau, khi sắp xếp ký tự, sẽ cho ra cùng 1 chuỗi. Dùng chuỗi đã sắp xếp đó làm key của map, value là danh sách các từ gốc." },
    { name: "Top K Frequent Elements", difficulty: "Medium", note: "Đếm tần suất rồi sắp xếp/lấy K phần tử nhiều nhất.", hint: "Bước 1: đếm tần suất từng phần tử bằng map. Bước 2: cần lấy K phần tử có tần suất cao nhất — có thể sắp xếp theo tần suất, hoặc dùng bucket sort theo tần suất để đạt O(n)." },
    { name: "Ransom Note", difficulty: "Easy", note: "Kiểm tra xem có thể ghép chữ trong 'magazine' để tạo ra 'ransomNote' hay không, mỗi ký tự trong magazine chỉ dùng được 1 lần.", hint: "Đếm tần suất từng ký tự trong magazine. Duyệt qua ransomNote, mỗi ký tự cần trừ đi 1 trong map — nếu không đủ số lượng (âm hoặc không tồn tại) thì trả về false." },
    { name: "Subarray Sum Equals K", difficulty: "Medium", note: "Đếm số lượng dãy con liên tiếp có tổng bằng k, dùng prefix sum kết hợp Hash Map.", hint: "Nếu prefixSum[j] - prefixSum[i] = k, thì dãy con từ i+1 đến j có tổng k. Lưu tần suất các prefixSum đã gặp vào map, mỗi bước kiểm tra xem (prefixSum hiện tại - k) đã xuất hiện bao nhiêu lần." },
    { name: "Longest Consecutive Sequence", difficulty: "Medium", note: "Tìm độ dài dãy số nguyên liên tiếp dài nhất trong mảng (không cần liền kề trong mảng gốc), dùng Set để tra cứu O(1).", hint: "Đưa tất cả số vào 1 Set. Với mỗi số, chỉ bắt đầu đếm dãy nếu (số - 1) KHÔNG có trong Set — đó chính là điểm bắt đầu của một dãy liên tiếp. Từ đó đếm xem dãy kéo dài bao xa." }
  ],
  walkthrough: {
    problemName: "Two Sum",
    difficulty: "Easy",
    summary: "Cho mảng số nguyên nums và một số target, tìm chỉ số (index) của 2 phần tử có tổng bằng target. Giả sử luôn có đúng 1 đáp án, không dùng lại 1 phần tử 2 lần.",
    ioExample: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nGiải thích: nums[0] + nums[1] = 2 + 7 = 9",
    bruteForce: "Dùng 2 vòng lặp lồng nhau: với mỗi phần tử i, duyệt tiếp các phần tử j phía sau để kiểm tra nums[i] + nums[j] == target. Độ phức tạp O(n²).",
    optimized: "Duyệt mảng 1 lần. Tại mỗi phần tử nums[i], tính số còn thiếu = target - nums[i]. Kiểm tra xem số còn thiếu đã có trong map chưa (map lưu {giá trị: index} của các phần tử đã duyệt qua). Nếu có, trả về ngay. Nếu chưa, lưu nums[i] vào map rồi tiếp tục.",
    steps: [
      "Khởi tạo một Map rỗng để lưu {giá trị đã thấy: index của nó}.",
      "Duyệt qua từng phần tử nums[i], tính complement = target - nums[i].",
      "Kiểm tra map.has(complement) — nếu có, nghĩa là ta đã tìm được cặp, trả về [map.get(complement), i].",
      "Nếu không có, lưu nums[i] vào map: map.set(nums[i], i), rồi tiếp tục vòng lặp."
    ],
    code: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>(); // {giá trị: index}

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }

            seen.put(nums[i], i);
        }

        return new int[]{}; // không tìm thấy
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] result = twoSum(nums, 9);
        System.out.println(result[0] + ", " + result[1]); // 0, 1
    }
}`,
    timeComplexity: "O(n) — chỉ duyệt mảng một lần, mỗi lần tra map là O(1) trung bình.",
    spaceComplexity: "O(n) — trong trường hợp xấu nhất phải lưu gần hết mảng vào map.",
    similar: ["3Sum", "Two Sum II", "4Sum"]
  },
  demo: {
    description: "Chạy thử Two Sum: nhập mảng và target.",
    defaultInput: "2,7,11,15|9",
    fn: (inputStr) => {
      const [arrPart, targetPart] = inputStr.split("|");
      const nums = (arrPart || "").split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      const target = Number((targetPart || "").trim());
      if (nums.length === 0 || isNaN(target)) return "Định dạng: mảng|target, ví dụ 2,7,11,15|9";
      const seen = new Map();
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
          return `Input: [${nums.join(",")}], target=${target}\nKết quả: [${seen.get(complement)}, ${i}] (nums[${seen.get(complement)}]=${nums[seen.get(complement)]}, nums[${i}]=${nums[i]})`;
        }
        seen.set(nums[i], i);
      }
      return `Input: [${nums.join(",")}], target=${target}\nKhông tìm thấy cặp nào phù hợp.`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Duyệt mảng một lần, mỗi lần tra cứu Map là O(1) trung bình.",
    space: "O(n)",
    spaceDesc: "Lưu tối đa n phần tử trong Map."
  },
  quiz: [
    {
      q: "Vì sao dùng Hash Map giúp Two Sum nhanh hơn brute-force?",
      options: [
        "Vì Hash Map tự động sắp xếp mảng",
        "Vì tra cứu 'giá trị này đã xuất hiện chưa' trong Map là O(1) thay vì phải duyệt lại O(n)",
        "Vì Hash Map dùng ít bộ nhớ hơn mảng",
        "Vì JavaScript chạy Map nhanh hơn Array theo mặc định"
      ],
      correctIndex: 1,
      explain: "Cốt lõi là tốc độ tra cứu: thay vì duyệt lại toàn bộ mảng để tìm complement (O(n)), tra Map chỉ mất O(1) trung bình."
    },
    {
      q: "Trong Two Sum, tại sao ta lưu (giá trị, index) vào map SAU KHI kiểm tra complement, không phải trước?",
      options: [
        "Để tránh dùng chính phần tử đó ghép với chính nó (trừ khi có 2 phần tử trùng giá trị)",
        "Vì JavaScript yêu cầu thứ tự đó",
        "Không có lý do, thứ tự nào cũng được",
        "Để tiết kiệm bộ nhớ"
      ],
      correctIndex: 0,
      explain: "Nếu lưu trước rồi mới kiểm tra, ta có thể vô tình ghép nums[i] với chính nó khi target = 2*nums[i], dẫn đến kết quả sai."
    }
  ]
},

/* ================= 3. TWO POINTERS ================= */
{
  id: "two-pointers",
  name: "Two Pointers",
  shortDesc: "Dùng 2 con trỏ di chuyển trên mảng/chuỗi để giảm số vòng lặp lồng nhau.",
  difficultyTag: "Easy",
  definition: "Two Pointers là kỹ thuật dùng 2 biến chỉ số (con trỏ) di chuyển trên mảng hoặc chuỗi — thường là một từ đầu, một từ cuối, hoặc cả hai cùng chiều với tốc độ khác nhau — để giải quyết bài toán mà không cần vòng lặp lồng nhau.",
  signals: [
    "Mảng/chuỗi đã được sắp xếp (sorted).",
    "Đề bài liên quan đến palindrome, đối xứng, hoặc so sánh từ 2 đầu.",
    "Cần tìm cặp/bộ phần tử thỏa điều kiện tổng trong mảng đã sắp xếp."
  ],
  whenToUse: "Dùng khi mảng đã sắp xếp (hoặc có thể sắp xếp) và bài toán liên quan đến việc so sánh/kết hợp phần tử từ 2 phía. Nếu tăng con trỏ trái hoặc giảm con trỏ phải đều có ý nghĩa rõ ràng để tiến gần đáp án hơn, đây là dấu hiệu chắc chắn.",
  commonMistakes: [
    "Quên rằng Two Pointers thường yêu cầu mảng đã sắp xếp — áp dụng nhầm lên mảng chưa sắp xếp cho ra kết quả sai.",
    "Điều kiện dừng vòng lặp sai (dùng < thay vì <=, hoặc ngược lại) gây lỗi off-by-one.",
    "Không xử lý phần tử trùng lặp khi bài yêu cầu kết quả không được trùng (ví dụ 3Sum)."
  ],
  thinkingTemplate: "Hỏi: nếu tổng 2 phần tử ở 2 đầu quá lớn, mình nên di chuyển con trỏ nào để giảm tổng? Nếu quá nhỏ, nên di chuyển con trỏ nào để tăng tổng? Nếu câu trả lời rõ ràng và luôn đúng hướng, Two Pointers sẽ hoạt động.",
  codeTemplate: `public class TwoPointersTemplate {
    public static int[] twoPointers(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int sum = nums[left] + nums[right];

            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;  // cần tổng lớn hơn -> tăng phần tử nhỏ
            } else {
                right--; // cần tổng nhỏ hơn -> giảm phần tử lớn
            }
        }

        return new int[]{};
    }
}`,
  examples: [
    { name: "Valid Palindrome", difficulty: "Easy", note: "2 con trỏ từ 2 đầu chuỗi tiến vào giữa, so sánh ký tự.", hint: "Đặt 1 con trỏ ở đầu, 1 con trỏ ở cuối chuỗi. So sánh 2 ký tự (sau khi bỏ qua ký tự không phải chữ/số), nếu khác nhau -> không phải palindrome. Tiến 2 con trỏ vào giữa." },
    { name: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", note: "Bài đại diện bên dưới — tận dụng mảng đã sắp xếp.", hint: "Vì mảng đã sắp xếp, nếu tổng 2 đầu quá lớn thì giảm con trỏ phải, quá nhỏ thì tăng con trỏ trái." },
    { name: "3Sum", difficulty: "Medium", note: "Cố định 1 phần tử, dùng Two Pointers cho 2 phần tử còn lại.", hint: "Sắp xếp mảng trước. Cố định phần tử đầu tiên nums[i], sau đó dùng Two Pointers (left, right) trên phần còn lại để tìm 2 số có tổng = -nums[i]. Nhớ bỏ qua các giá trị trùng để tránh kết quả lặp." },
    { name: "Container With Most Water", difficulty: "Medium", note: "2 con trỏ từ 2 đầu, luôn di chuyển con trỏ có chiều cao thấp hơn.", hint: "Diện tích = khoảng cách × chiều cao thấp hơn trong 2 cột. Nếu di chuyển con trỏ ở cột CAO hơn, khoảng cách giảm mà chiều cao thấp nhất không thể tăng — chắc chắn không lợi. Vậy nên di chuyển con trỏ nào?" },
    { name: "Remove Duplicates from Sorted Array", difficulty: "Easy", note: "Xóa phần tử trùng lặp tại chỗ trong mảng đã sắp xếp, trả về độ dài mảng mới.", hint: "Dùng 1 con trỏ 'chậm' đánh dấu vị trí ghi phần tử duy nhất tiếp theo, 1 con trỏ 'nhanh' duyệt qua mảng. Chỉ ghi đè khi phần tử tại con trỏ nhanh khác phần tử vừa ghi." },
    { name: "Sort Colors", difficulty: "Medium", note: "Sắp xếp mảng chỉ gồm 3 giá trị (0,1,2) tại chỗ trong 1 lượt duyệt, dùng 3 con trỏ (Dutch National Flag).", hint: "Dùng 3 con trỏ: low (biên cuối vùng số 0), mid (đang xét), high (biên đầu vùng số 2). Nếu gặp số 0, đổi chỗ với low và tăng cả 2; gặp số 2, đổi chỗ với high và giảm high (không tăng mid vì cần xét lại phần tử vừa đổi)." },
    { name: "Trapping Rain Water", difficulty: "Medium", note: "Tính lượng nước có thể chứa được giữa các cột có chiều cao khác nhau, dùng Two Pointers với leftMax/rightMax.", hint: "Nước đọng tại 1 vị trí phụ thuộc vào min(cột cao nhất bên trái, cột cao nhất bên phải) trừ đi chiều cao tại đó. Dùng 2 con trỏ từ 2 đầu, luôn xử lý phía có leftMax/rightMax nhỏ hơn trước." }
  ],
  walkthrough: {
    problemName: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    summary: "Cho mảng số nguyên đã sắp xếp tăng dần numbers và một số target, tìm 2 số có tổng bằng target, trả về index (bắt đầu từ 1) của chúng.",
    ioExample: "Input: numbers = [2,7,11,15], target = 9\nOutput: [1,2]\nGiải thích: numbers[0] + numbers[1] = 2 + 7 = 9, trả về index 1-based",
    bruteForce: "Dùng Hash Map như Two Sum thường — vẫn đúng nhưng tốn thêm O(n) bộ nhớ, trong khi mảng đã sắp xếp cho phép làm tốt hơn mà không cần thêm bộ nhớ.",
    optimized: "Vì mảng đã sắp xếp, đặt 2 con trỏ: left ở đầu, right ở cuối. Nếu tổng quá nhỏ, tăng left (để lấy số lớn hơn). Nếu tổng quá lớn, giảm right (để lấy số nhỏ hơn). Cứ như vậy đến khi tìm thấy hoặc 2 con trỏ gặp nhau.",
    steps: [
      "Khởi tạo left = 0, right = numbers.length - 1.",
      "Tính sum = numbers[left] + numbers[right].",
      "Nếu sum === target: trả về [left+1, right+1] (đề yêu cầu index bắt đầu từ 1).",
      "Nếu sum < target: tăng left (cần số lớn hơn để tổng tăng lên).",
      "Nếu sum > target: giảm right (cần số nhỏ hơn để tổng giảm xuống).",
      "Lặp lại đến khi left < right không còn đúng."
    ],
    code: `public class Solution {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if (sum == target) {
                return new int[]{left + 1, right + 1}; // đề yêu cầu 1-based index
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }

        return new int[]{};
    }

    public static void main(String[] args) {
        int[] numbers = {2, 7, 11, 15};
        int[] result = twoSum(numbers, 9);
        System.out.println(result[0] + ", " + result[1]); // 1, 2
    }
}`,
    timeComplexity: "O(n) — mỗi con trỏ chỉ di chuyển tối đa n bước, tổng cộng vẫn là 1 lượt duyệt.",
    spaceComplexity: "O(1) — không cần thêm cấu trúc dữ liệu nào, chỉ 2 biến con trỏ.",
    similar: ["3Sum", "4Sum", "Container With Most Water"]
  },
  demo: {
    description: "Chạy thử Two Sum II với mảng đã sắp xếp và target.",
    defaultInput: "2,7,11,15|9",
    fn: (inputStr) => {
      const [arrPart, targetPart] = inputStr.split("|");
      const nums = (arrPart || "").split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      const target = Number((targetPart || "").trim());
      if (nums.length === 0 || isNaN(target)) return "Định dạng: mảng đã sắp xếp|target, ví dụ 2,7,11,15|9";
      let left = 0, right = nums.length - 1;
      while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) {
          return `Input: [${nums.join(",")}], target=${target}\nKết quả (1-based): [${left+1}, ${right+1}]`;
        } else if (sum < target) left++;
        else right--;
      }
      return `Input: [${nums.join(",")}], target=${target}\nKhông tìm thấy cặp nào phù hợp.`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Hai con trỏ cùng nhau chỉ đi qua mảng tối đa 1 lần.",
    space: "O(1)",
    spaceDesc: "Không cần cấu trúc dữ liệu phụ, chỉ vài biến con trỏ."
  },
  quiz: [
    {
      q: "Điều kiện quan trọng nhất để áp dụng Two Pointers kiểu 'từ 2 đầu vào giữa' là gì?",
      options: [
        "Mảng phải có số lượng phần tử chẵn",
        "Mảng/chuỗi phải đã được sắp xếp hoặc có tính đối xứng phù hợp",
        "Mảng phải chỉ chứa số dương",
        "Mảng phải có ít nhất 100 phần tử"
      ],
      correctIndex: 1,
      explain: "Two Pointers kiểu 2 đầu dựa vào tính chất sắp xếp: biết chắc di chuyển con trỏ nào sẽ làm tổng tăng/giảm theo đúng hướng mong muốn."
    },
    {
      q: "Trong Two Sum II, khi sum > target, ta nên làm gì?",
      options: ["Tăng left", "Giảm right", "Tăng cả 2 con trỏ", "Dừng thuật toán ngay"],
      correctIndex: 1,
      explain: "Vì mảng tăng dần, giảm right sẽ lấy một số nhỏ hơn, giúp tổng giảm xuống gần target hơn."
    }
  ]
}

,

/* ================= 4. SLIDING WINDOW ================= */
{
  id: "sliding-window",
  name: "Sliding Window",
  shortDesc: "Duy trì một 'cửa sổ' liên tục trên mảng/chuỗi, mở rộng và thu hẹp thay vì tính lại từ đầu.",
  difficultyTag: "Medium",
  definition: "Sliding Window là kỹ thuật giữ một đoạn con liên tiếp (cửa sổ) trong mảng/chuỗi, dùng 2 con trỏ left và right để mở rộng cửa sổ về bên phải và thu hẹp về bên trái, tránh phải tính toán lại từ đầu mỗi khi cửa sổ thay đổi.",
  signals: [
    "Đề bài nói về 'dãy con liên tiếp' (substring/subarray) thỏa điều kiện nào đó.",
    "Có từ khóa: độ dài cố định, độ dài nhỏ nhất/lớn nhất, không lặp ký tự.",
    "Brute-force của bạn là thử tất cả các đoạn con (O(n²) hoặc O(n³))."
  ],
  whenToUse: "Dùng khi cần tìm đoạn con liên tiếp tối ưu (dài nhất/ngắn nhất/tổng lớn nhất) thỏa một điều kiện, và điều kiện đó có thể cập nhật dần khi thêm/bớt phần tử ở 2 đầu cửa sổ (thay vì tính lại từ đầu).",
  commonMistakes: [
    "Không thu hẹp cửa sổ (left++) khi điều kiện bị vi phạm, dẫn đến cửa sổ sai.",
    "Dùng lại toàn bộ vòng lặp để tính tổng/đếm mỗi khi cửa sổ thay đổi, thay vì cập nhật tăng dần (mất đi lợi ích của kỹ thuật này).",
    "Nhầm giữa 'cửa sổ kích thước cố định' và 'cửa sổ kích thước thay đổi' — áp dụng sai template."
  ],
  thinkingTemplate: "Hỏi: khi mở rộng cửa sổ (right++), điều kiện có thể bị vi phạm không? Nếu có, mình cần thu hẹp từ bên trái (left++) đến khi nào? Nếu trả lời được rõ ràng, đó là dấu hiệu Sliding Window phù hợp.",
  codeTemplate: `import java.util.HashMap;
import java.util.Map;

public class SlidingWindowTemplate {
    public static int slidingWindow(String s) {
        int left = 0;
        Map<Character, Integer> windowState = new HashMap<>(); // hoặc biến đếm, tổng, v.v.
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            // Bước 1: thêm s[right] vào cửa sổ
            char c = s.charAt(right);
            windowState.put(c, windowState.getOrDefault(c, 0) + 1);

            // Bước 2: khi điều kiện bị vi phạm, thu hẹp từ bên trái
            while (/* điều kiện vi phạm */ false) {
                char leftChar = s.charAt(left);
                windowState.put(leftChar, windowState.get(leftChar) - 1);
                left++;
            }

            // Bước 3: cập nhật kết quả tốt nhất
            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}`,
  examples: [
    { name: "Maximum Average Subarray I", difficulty: "Easy", note: "Cửa sổ kích thước cố định k, trượt qua mảng.", hint: "Tính tổng k phần tử đầu tiên. Khi trượt cửa sổ sang phải 1 bước, trừ đi phần tử vừa ra khỏi cửa sổ (bên trái) và cộng thêm phần tử mới vào (bên phải) — không tính lại từ đầu." },
    { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", note: "Bài đại diện bên dưới — cửa sổ kích thước thay đổi.", hint: "Mở rộng right liên tục. Nếu ký tự tại right đã có trong cửa sổ, thu hẹp left cho đến khi loại bỏ ký tự trùng đó." },
    { name: "Minimum Size Subarray Sum", difficulty: "Medium", note: "Tìm đoạn con ngắn nhất có tổng >= target.", hint: "Mở rộng right, cộng dồn tổng. Khi tổng >= target, thử thu hẹp left để tìm cửa sổ NGẮN HƠN vẫn thỏa điều kiện, ghi nhận độ dài nhỏ nhất mỗi lần thỏa." },
    { name: "Permutation in String", difficulty: "Medium", note: "Cửa sổ kích thước cố định, so sánh frequency counter.", hint: "Tạo frequency counter của chuỗi cần tìm hoán vị. Trượt cửa sổ có độ dài bằng đúng chuỗi đó qua chuỗi lớn, so sánh frequency counter của cửa sổ với frequency counter mục tiêu." },
    { name: "Best Time to Buy and Sell Stock", difficulty: "Easy", note: "Có thể xem như Sliding Window với cửa sổ [giá thấp nhất đã thấy, giá hiện tại], mở rộng right liên tục.", hint: "Left là ngày mua với giá thấp nhất đã thấy, right là ngày đang xét để bán. Nếu giá tại right thấp hơn giá tại left, di chuyển left tới right (tìm điểm mua mới thấp hơn)." },
    { name: "Fruit Into Baskets", difficulty: "Medium", note: "Tìm đoạn con dài nhất chỉ chứa tối đa 2 loại phần tử khác nhau — Sliding Window với điều kiện giới hạn số loại.", hint: "Dùng map đếm loại quả trong cửa sổ. Mở rộng right, thêm loại quả vào map. Khi map có nhiều hơn 2 loại (kích thước map > 2), thu hẹp left cho đến khi chỉ còn 2 loại." },
    { name: "Longest Repeating Character Replacement", difficulty: "Medium", note: "Tìm đoạn con dài nhất có thể biến thành 1 ký tự duy nhất sau khi thay đổi tối đa k ký tự.", hint: "Trong cửa sổ, nếu (độ dài cửa sổ - số lần xuất hiện ký tự nhiều nhất) > k thì cửa sổ cần nhiều hơn k lần thay đổi -> vi phạm, phải thu hẹp left. Theo dõi tần suất ký tự trong cửa sổ bằng map." }
  ],
  walkthrough: {
    problemName: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    summary: "Cho một chuỗi s, tìm độ dài của chuỗi con dài nhất không chứa ký tự lặp lại.",
    ioExample: "Input: s = \"abcabcbb\"\nOutput: 3\nGiải thích: chuỗi con dài nhất không lặp là \"abc\", độ dài 3",
    bruteForce: "Thử tất cả các chuỗi con có thể (2 vòng lặp lồng nhau chọn điểm đầu/cuối), với mỗi chuỗi con kiểm tra xem có ký tự lặp không (thêm 1 vòng lặp nữa). Độ phức tạp O(n³) hoặc O(n²).",
    optimized: "Dùng Sliding Window với Set lưu các ký tự đang có trong cửa sổ. Mở rộng right liên tục; nếu s[right] đã có trong Set (nghĩa là bị lặp), thu hẹp left cho đến khi loại bỏ ký tự trùng đó ra khỏi cửa sổ.",
    steps: [
      "Khởi tạo left = 0, một Set rỗng để lưu ký tự trong cửa sổ hiện tại, và best = 0.",
      "Duyệt right từ 0 đến hết chuỗi.",
      "Nếu s[right] đã có trong Set: liên tục xóa s[left] khỏi Set và tăng left, cho đến khi s[right] không còn trùng.",
      "Thêm s[right] vào Set.",
      "Cập nhật best = Math.max(best, right - left + 1).",
      "Trả về best sau khi duyệt hết chuỗi."
    ],
    code: `import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            // Thu hẹp cửa sổ cho đến khi hết trùng ký tự
            while (window.contains(s.charAt(right))) {
                window.remove(s.charAt(left));
                left++;
            }

            window.add(s.charAt(right));
            best = Math.max(best, right - left + 1);
        }

        return best;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
    }
}`,
    timeComplexity: "O(n) — mỗi ký tự được thêm vào và xóa khỏi cửa sổ tối đa 1 lần.",
    spaceComplexity: "O(min(n, m)) — với m là kích thước bảng ký tự (ví dụ 26 chữ cái, hoặc 128 ASCII).",
    similar: ["Minimum Size Subarray Sum", "Permutation in String", "Longest Repeating Character Replacement"]
  },
  demo: {
    description: "Chạy thử tìm chuỗi con dài nhất không lặp ký tự.",
    defaultInput: "abcabcbb",
    fn: (inputStr) => {
      const s = inputStr;
      if (!s) return "Vui lòng nhập một chuỗi.";
      const window = new Set();
      let left = 0, best = 0, bestStr = "";
      for (let right = 0; right < s.length; right++) {
        while (window.has(s[right])) {
          window.delete(s[left]);
          left++;
        }
        window.add(s[right]);
        if (right - left + 1 > best) {
          best = right - left + 1;
          bestStr = s.slice(left, right + 1);
        }
      }
      return `Input: "${s}"\nĐộ dài lớn nhất: ${best}\nChuỗi con: "${bestStr}"`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Mỗi phần tử được xử lý (thêm/xóa khỏi cửa sổ) tối đa 2 lần — vẫn là O(n).",
    space: "O(min(n, m))",
    spaceDesc: "Kích thước Set/Map bị giới hạn bởi bảng ký tự có thể có, không phải độ dài chuỗi."
  },
  quiz: [
    {
      q: "Sliding Window khác brute-force ở điểm mấu chốt nào?",
      options: [
        "Sliding Window luôn dùng đệ quy",
        "Sliding Window tránh tính toán lại từ đầu mỗi khi cửa sổ thay đổi, chỉ cập nhật phần thêm/bớt",
        "Sliding Window chỉ hoạt động với chuỗi, không hoạt động với mảng số",
        "Sliding Window luôn nhanh hơn vì dùng ít bộ nhớ hơn"
      ],
      correctIndex: 1,
      explain: "Điểm mấu chốt là tính tăng dần (incremental): khi cửa sổ trượt, ta chỉ xử lý phần tử mới thêm/bớt, không tính lại toàn bộ cửa sổ."
    },
    {
      q: "Trong bài Longest Substring Without Repeating Characters, khi nào ta thu hẹp cửa sổ (tăng left)?",
      options: [
        "Mỗi khi right tăng",
        "Khi ký tự tại right đã tồn tại trong cửa sổ hiện tại",
        "Khi cửa sổ đạt độ dài tối đa cố định",
        "Không bao giờ cần thu hẹp"
      ],
      correctIndex: 1,
      explain: "Ta chỉ thu hẹp khi phát hiện ký tự lặp — đó là lúc điều kiện 'không trùng ký tự' bị vi phạm."
    }
  ]
},

/* ================= 5. STACK ================= */
{
  id: "stack",
  name: "Stack",
  shortDesc: "Cấu trúc dữ liệu LIFO (vào sau ra trước) — cực mạnh cho bài toán về cặp/khớp và 'phần tử gần nhất'.",
  difficultyTag: "Easy",
  definition: "Stack (ngăn xếp) là cấu trúc dữ liệu LIFO (Last In, First Out — vào sau ra trước). Trong LeetCode, Stack thường dùng mảng JavaScript với push()/pop() để mô phỏng.",
  signals: [
    "Đề bài liên quan đến dấu ngoặc, khớp cặp mở-đóng (parentheses, brackets).",
    "Cần tìm 'phần tử lớn hơn/nhỏ hơn gần nhất' theo một chiều (ví dụ: nhiệt độ ấm hơn tiếp theo).",
    "Cần xử lý biểu thức toán học, tính toán theo thứ tự ưu tiên."
  ],
  whenToUse: "Dùng khi bài toán có cấu trúc 'lồng nhau' (nested) cần khớp cặp, hoặc cần nhớ lại phần tử gần nhất chưa được xử lý xong khi duyệt qua dữ liệu.",
  commonMistakes: [
    "Quên kiểm tra stack rỗng trước khi pop(), gây lỗi hoặc kết quả sai.",
    "Không kiểm tra stack có rỗng ở cuối cùng để xác nhận mọi thứ đã khớp hết.",
    "Dùng sai loại cấu trúc — cần Queue (FIFO) nhưng lại dùng Stack (LIFO)."
  ],
  thinkingTemplate: "Hỏi: khi gặp phần tử đóng (ví dụ ')'); phần tử nào cần khớp với nó? Đó luôn là phần tử mở gần nhất chưa được khớp — chính là phần tử trên cùng của Stack. Nếu bài toán có tính chất 'gần nhất chưa xử lý xong', nghĩ ngay đến Stack.",
  codeTemplate: `import java.util.Deque;
import java.util.ArrayDeque;

public class StackTemplate {
    public static boolean processWithStack(char[] items) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char item : items) {
            if (/* điều kiện đẩy vào stack */ true) {
                stack.push(item);
            } else {
                // Bước: lấy phần tử gần nhất ra để xử lý/so khớp
                char top = stack.pop();
                // so sánh/xử lý top với item
            }
        }

        return stack.isEmpty(); // ví dụ: kiểm tra mọi thứ đã khớp hết
    }
}`,
  examples: [
    { name: "Valid Parentheses", difficulty: "Easy", note: "Bài đại diện bên dưới — khớp dấu ngoặc mở/đóng.", hint: "Gặp dấu mở thì đẩy vào stack. Gặp dấu đóng thì so sánh với đỉnh stack — có khớp loại không?" },
    { name: "Min Stack", difficulty: "Medium", note: "Thiết kế Stack hỗ trợ lấy giá trị nhỏ nhất trong O(1).", hint: "Dùng 2 stack song song: 1 stack dữ liệu bình thường, 1 stack lưu giá trị nhỏ nhất tính đến thời điểm đó. Mỗi lần push, đẩy vào stack thứ 2 giá trị min(x, đỉnh hiện tại của stack min)." },
    { name: "Daily Temperatures", difficulty: "Medium", note: "Dùng Stack lưu index để tìm ngày ấm hơn tiếp theo.", hint: "Duyệt mảng, dùng stack lưu index của các ngày CHƯA tìm được ngày ấm hơn. Khi gặp nhiệt độ mới lớn hơn nhiệt độ tại đỉnh stack, pop ra và tính khoảng cách ngày." },
    { name: "Evaluate Reverse Polish Notation", difficulty: "Medium", note: "Dùng Stack để tính biểu thức hậu tố.", hint: "Duyệt từng token: nếu là số thì đẩy vào stack. Nếu là toán tử, pop 2 số gần nhất ra, tính kết quả, rồi đẩy kết quả trở lại stack." },
    { name: "Remove All Adjacent Duplicates In String", difficulty: "Easy", note: "Xóa các cặp ký tự liền kề giống nhau cho đến khi không còn cặp nào, dùng Stack.", hint: "Duyệt từng ký tự: nếu ký tự hiện tại giống đỉnh stack, pop đỉnh ra (xóa cặp trùng). Nếu khác, đẩy ký tự vào stack." },
    { name: "Implement Queue using Stacks", difficulty: "Easy", note: "Mô phỏng hàng đợi (FIFO) chỉ bằng 2 ngăn xếp (LIFO).", hint: "Dùng 2 stack: 1 stack để push (nhập vào), 1 stack để pop (xuất ra). Khi cần pop mà stack xuất đang rỗng, đổ toàn bộ stack nhập sang stack xuất — thứ tự sẽ tự động đảo ngược thành FIFO." },
    { name: "Asteroid Collision", difficulty: "Medium", note: "Mô phỏng va chạm các hành tinh di chuyển ngược chiều nhau, dùng Stack để xử lý va chạm liên tiếp.", hint: "Duyệt từng hành tinh, dùng stack lưu các hành tinh đang 'còn sống'. Khi hành tinh mới đi sang trái và đỉnh stack đi sang phải, chúng va chạm — so sánh kích thước để biết ai bị phá hủy, lặp lại việc so sánh với đỉnh stack mới nếu cần." }
  ],
  walkthrough: {
    problemName: "Valid Parentheses",
    difficulty: "Easy",
    summary: "Cho một chuỗi s chỉ chứa các ký tự '(', ')', '{', '}', '[', ']'. Xác định chuỗi có hợp lệ không — nghĩa là mọi dấu mở đều được đóng đúng loại và đúng thứ tự.",
    ioExample: "Input: s = \"()[]{}\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false",
    bruteForce: "Có thể thử liên tục tìm và xóa các cặp '()' , '[]', '{}' liền kề nhau cho đến khi không xóa được nữa, rồi kiểm tra chuỗi có rỗng không. Cách này hoạt động nhưng phức tạp và chậm hơn cần thiết (có thể lên tới O(n²) do phải quét lại chuỗi nhiều lần).",
    optimized: "Dùng Stack: duyệt qua từng ký tự. Nếu là dấu mở, đẩy vào stack. Nếu là dấu đóng, kiểm tra đỉnh stack có phải dấu mở tương ứng không — nếu đúng thì pop ra, nếu sai (hoặc stack rỗng) thì chuỗi không hợp lệ ngay lập tức.",
    steps: [
      "Khởi tạo stack rỗng và một map ánh xạ dấu đóng -> dấu mở tương ứng, ví dụ { ')': '(', ']': '[', '}': '{' }.",
      "Duyệt từng ký tự c trong chuỗi.",
      "Nếu c là dấu mở ('(', '[', '{'): đẩy vào stack.",
      "Nếu c là dấu đóng: kiểm tra stack có rỗng không, hoặc đỉnh stack có khớp với dấu mở tương ứng không. Nếu không khớp -> trả về false ngay.",
      "Nếu khớp, pop đỉnh stack ra.",
      "Sau khi duyệt hết chuỗi, trả về true nếu stack rỗng (mọi dấu đã khớp hết), false nếu còn dấu mở chưa đóng."
    ],
    code: `import java.util.Deque;
import java.util.ArrayDeque;
import java.util.Map;
import java.util.HashMap;

public class Solution {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put(']', '[');
        pairs.put('}', '{');

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                // c là dấu đóng
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}")); // true
        System.out.println(isValid("(]"));     // false
    }
}`,
    timeComplexity: "O(n) — duyệt chuỗi một lần, mỗi thao tác push/pop là O(1).",
    spaceComplexity: "O(n) — trong trường hợp xấu nhất (toàn dấu mở), stack chứa hết n ký tự.",
    similar: ["Min Stack", "Remove All Adjacent Duplicates In String", "Generate Parentheses"]
  },
  demo: {
    description: "Kiểm tra chuỗi dấu ngoặc có hợp lệ không.",
    defaultInput: "()[]{}",
    fn: (inputStr) => {
      const s = inputStr;
      const stack = [];
      const pairs = { ')': '(', ']': '[', '}': '{' };
      for (const c of s) {
        if (c === '(' || c === '[' || c === '{') {
          stack.push(c);
        } else if (c === ')' || c === ']' || c === '}') {
          if (stack.length === 0 || stack.pop() !== pairs[c]) {
            return `Input: "${s}"\nKết quả: false (không hợp lệ)`;
          }
        }
      }
      const valid = stack.length === 0;
      return `Input: "${s}"\nKết quả: ${valid} (${valid ? "hợp lệ" : "không hợp lệ, còn dấu chưa đóng"})`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Duyệt chuỗi một lần, các thao tác stack đều O(1).",
    space: "O(n)",
    spaceDesc: "Trường hợp xấu nhất lưu toàn bộ ký tự mở vào stack."
  },
  quiz: [
    {
      q: "Vì sao Stack (LIFO) phù hợp với bài toán khớp dấu ngoặc?",
      options: [
        "Vì Stack luôn nhanh hơn Array",
        "Vì dấu đóng luôn cần khớp với dấu mở GẦN NHẤT chưa đóng — đúng tính chất 'vào sau ra trước'",
        "Vì Stack tự động sắp xếp phần tử",
        "Vì đề bài yêu cầu dùng Stack"
      ],
      correctIndex: 1,
      explain: "Dấu ngoặc lồng nhau có tính chất: dấu đóng phải khớp với dấu mở gần nhất còn 'đang mở' — đây chính xác là hành vi LIFO của Stack."
    },
    {
      q: "Trong Valid Parentheses, khi nào ta biết chuỗi KHÔNG hợp lệ ngay lập tức?",
      options: [
        "Khi gặp dấu mở đầu tiên",
        "Khi gặp dấu đóng nhưng stack rỗng hoặc đỉnh stack không khớp loại dấu mở tương ứng",
        "Khi chuỗi có độ dài lẻ",
        "Khi stack có nhiều hơn 3 phần tử"
      ],
      correctIndex: 1,
      explain: "Đây là 2 trường hợp lỗi: không có gì để khớp (stack rỗng), hoặc khớp sai loại dấu (ví dụ đỉnh stack là '(' nhưng gặp ']')."
    }
  ]
},

/* ================= 6. BINARY SEARCH ================= */
{
  id: "binary-search",
  name: "Binary Search",
  shortDesc: "Tìm kiếm trong mảng đã sắp xếp bằng cách chia đôi phạm vi liên tục — O(log n).",
  difficultyTag: "Easy",
  definition: "Binary Search (tìm kiếm nhị phân) là thuật toán tìm một giá trị trong mảng đã sắp xếp bằng cách liên tục chia đôi phạm vi tìm kiếm: so sánh phần tử giữa với target, rồi loại bỏ một nửa không thể chứa đáp án.",
  signals: [
    "Mảng/dữ liệu đã được sắp xếp (hoặc có tính đơn điệu — monotonic).",
    "Đề bài hỏi tìm vị trí, giá trị nhỏ nhất/lớn nhất thỏa điều kiện.",
    "Có từ khóa: 'đã sắp xếp' (sorted), độ phức tạp yêu cầu O(log n)."
  ],
  whenToUse: "Dùng khi dữ liệu đã sắp xếp, hoặc có thể định nghĩa một hàm kiểm tra 'đúng/sai' mà kết quả kiểm tra đó thay đổi đơn điệu (một chiều) theo giá trị đang tìm — ví dụ: từ False chuyển sang True tại đúng 1 điểm.",
  commonMistakes: [
    "Tính mid sai dẫn tới tràn số hoặc lặp vô hạn: nên dùng left + Math.floor((right-left)/2) thay vì (left+right)/2.",
    "Điều kiện vòng lặp sai: nhầm giữa while (left <= right) và while (left < right) tùy bài toán.",
    "Cập nhật left/right sai, quên +1/-1 gây lặp vô hạn (ví dụ right = mid thay vì right = mid - 1)."
  ],
  thinkingTemplate: "Hỏi: nếu kiểm tra phần tử giữa và nó không phải đáp án, mình có thể loại bỏ chắc chắn một nửa mảng không? Nếu câu trả lời là có (nhờ tính sắp xếp/đơn điệu), Binary Search sẽ hoạt động và cho O(log n).",
  codeTemplate: `public class BinarySearchTemplate {
    public static int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;  // target ở nửa phải
            } else {
                right = mid - 1; // target ở nửa trái
            }
        }

        return -1; // không tìm thấy
    }
}`,
  examples: [
    { name: "Binary Search", difficulty: "Easy", note: "Bài đại diện bên dưới — tìm kiếm nhị phân cơ bản." },
    { name: "Search Insert Position", difficulty: "Easy", note: "Tìm vị trí chèn nếu không tìm thấy target." },
    { name: "First Bad Version", difficulty: "Easy", note: "Binary Search trên hàm kiểm tra đơn điệu (isBadVersion)." },
    { name: "Search in Rotated Sorted Array", difficulty: "Medium", note: "Mảng đã sắp xếp nhưng bị xoay — cần xác định nửa nào vẫn còn sắp xếp." }
  ],
  walkthrough: {
    problemName: "Binary Search",
    difficulty: "Easy",
    summary: "Cho mảng số nguyên nums đã sắp xếp tăng dần và một số target, trả về index của target nếu tồn tại, ngược lại trả về -1.",
    ioExample: "Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nGiải thích: nums[4] = 9",
    bruteForce: "Duyệt tuyến tính từng phần tử để tìm target. Độ phức tạp O(n) — hoạt động đúng nhưng không tận dụng được tính chất mảng đã sắp xếp.",
    optimized: "Vì mảng đã sắp xếp, mỗi lần kiểm tra phần tử giữa, ta biết chắc target (nếu có) nằm ở nửa nào, nên loại bỏ được một nửa mảng sau mỗi bước — giảm độ phức tạp xuống O(log n).",
    steps: [
      "Khởi tạo left = 0, right = nums.length - 1.",
      "Trong khi left <= right: tính mid = left + Math.floor((right-left)/2).",
      "Nếu nums[mid] === target: trả về mid ngay.",
      "Nếu nums[mid] < target: target (nếu có) nằm bên phải mid, đặt left = mid + 1.",
      "Nếu nums[mid] > target: target (nếu có) nằm bên trái mid, đặt right = mid - 1.",
      "Nếu vòng lặp kết thúc mà chưa tìm thấy, trả về -1."
    ],
    code: `public class Solution {
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {-1, 0, 3, 5, 9, 12};
        System.out.println(search(nums, 9)); // 4
    }
}`,
    timeComplexity: "O(log n) — mỗi bước loại bỏ một nửa phạm vi tìm kiếm.",
    spaceComplexity: "O(1) — chỉ dùng vài biến con trỏ, không cần đệ quy hay cấu trúc phụ.",
    similar: ["Search Insert Position", "Find First and Last Position of Element in Sorted Array", "Search in Rotated Sorted Array"]
  },
  demo: {
    description: "Chạy thử Binary Search: nhập mảng đã sắp xếp và target.",
    defaultInput: "-1,0,3,5,9,12|9",
    fn: (inputStr) => {
      const [arrPart, targetPart] = inputStr.split("|");
      const nums = (arrPart || "").split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      const target = Number((targetPart || "").trim());
      if (nums.length === 0 || isNaN(target)) return "Định dạng: mảng đã sắp xếp|target, ví dụ -1,0,3,5,9,12|9";
      let left = 0, right = nums.length - 1;
      let steps = 0;
      while (left <= right) {
        steps++;
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
          return `Input: [${nums.join(",")}], target=${target}\nTìm thấy tại index: ${mid} (sau ${steps} bước so sánh)`;
        } else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
      }
      return `Input: [${nums.join(",")}], target=${target}\nKhông tìm thấy (sau ${steps} bước so sánh)`;
    }
  },
  complexity: {
    time: "O(log n)",
    timeDesc: "Phạm vi tìm kiếm giảm một nửa sau mỗi lần so sánh.",
    space: "O(1)",
    spaceDesc: "Chỉ dùng các biến left, right, mid — không cần thêm bộ nhớ theo kích thước input."
  },
  quiz: [
    {
      q: "Điều kiện bắt buộc để dùng Binary Search cơ bản là gì?",
      options: [
        "Mảng phải có độ dài chẵn",
        "Mảng phải đã được sắp xếp (hoặc có tính đơn điệu tương đương)",
        "Mảng phải chỉ chứa số nguyên dương",
        "Mảng phải có ít nhất 2 phần tử"
      ],
      correctIndex: 1,
      explain: "Binary Search chỉ hoạt động đúng khi có thể chắc chắn loại bỏ một nửa phạm vi sau mỗi lần so sánh — điều này đòi hỏi tính sắp xếp hoặc đơn điệu."
    },
    {
      q: "Tại sao nên viết mid = left + Math.floor((right-left)/2) thay vì (left+right)/2?",
      options: [
        "Không có sự khác biệt, chỉ là phong cách viết code",
        "Để tránh tràn số (integer overflow) khi left+right rất lớn ở một số ngôn ngữ, và đảm bảo làm tròn xuống đúng cách",
        "Vì JavaScript không hỗ trợ phép cộng 2 số lớn",
        "Để code chạy nhanh hơn"
      ],
      correctIndex: 1,
      explain: "Đây là thói quen tốt để tránh lỗi tràn số ở các ngôn ngữ có giới hạn kiểu số nguyên (như Java, C++), dù JavaScript ít gặp vấn đề này hơn."
    }
  ]
},

/* ================= 7. LINKED LIST ================= */
{
  id: "linked-list",
  name: "Linked List",
  shortDesc: "Cấu trúc dữ liệu gồm các node nối tiếp nhau qua con trỏ 'next' — không truy cập ngẫu nhiên như mảng.",
  difficultyTag: "Easy",
  definition: "Linked List (danh sách liên kết) là cấu trúc dữ liệu gồm các node, mỗi node chứa giá trị (value) và một con trỏ (next) trỏ tới node tiếp theo. Khác với mảng, Linked List không hỗ trợ truy cập ngẫu nhiên theo index — phải đi từ đầu.",
  signals: [
    "Đề bài cho ListNode hoặc đề cập 'linked list', 'head', 'next'.",
    "Yêu cầu đảo ngược, hợp nhất, hoặc phát hiện chu trình (cycle) trong danh sách.",
    "Có nhắc tới 'xóa node thứ N từ cuối', 'tìm điểm giữa danh sách'."
  ],
  whenToUse: "Dùng kỹ thuật thao tác con trỏ (pointer manipulation) khi làm việc trực tiếp với cấu trúc Linked List — thường kết hợp với kỹ thuật 'Fast & Slow Pointers' để tìm chu trình hoặc điểm giữa mà không cần đếm trước độ dài.",
  commonMistakes: [
    "Làm mất tham chiếu tới phần còn lại của danh sách khi thay đổi next (quên lưu next vào biến tạm trước khi ghi đè).",
    "Không xử lý trường hợp danh sách rỗng hoặc chỉ có 1 node.",
    "Quên dùng dummy node (node giả) khi thao tác có thể thay đổi chính head, khiến code phải viết case đặc biệt phức tạp hơn."
  ],
  thinkingTemplate: "Hỏi: mình cần bao nhiêu con trỏ để theo dõi trạng thái (node hiện tại, node trước đó, node tiếp theo)? Với đảo ngược danh sách, cần 3 con trỏ: prev, curr, next. Với tìm chu trình, cần 2 con trỏ tốc độ khác nhau (fast, slow).",
  codeTemplate: `// Định nghĩa node (thường đã cho sẵn trong đề bài)
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class LinkedListTemplate {
    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // lưu lại trước khi ghi đè
            curr.next = prev;              // đảo hướng con trỏ
            prev = curr;
            curr = nextTemp;
        }

        return prev; // head mới sau khi đảo ngược
    }
}`,
  examples: [
    { name: "Reverse Linked List", difficulty: "Easy", note: "Bài đại diện bên dưới — đảo ngược toàn bộ danh sách." },
    { name: "Merge Two Sorted Lists", difficulty: "Easy", note: "Hợp nhất 2 danh sách đã sắp xếp thành 1, dùng dummy node." },
    { name: "Linked List Cycle", difficulty: "Easy", note: "Fast & Slow Pointers phát hiện chu trình." },
    { name: "Remove Nth Node From End of List", difficulty: "Medium", note: "2 con trỏ cách nhau N bước để tìm node cần xóa trong 1 lượt duyệt." }
  ],
  walkthrough: {
    problemName: "Reverse Linked List",
    difficulty: "Easy",
    summary: "Cho head của một danh sách liên kết đơn, đảo ngược danh sách và trả về head mới.",
    ioExample: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
    bruteForce: "Có thể duyệt danh sách, lưu toàn bộ giá trị vào một mảng, đảo ngược mảng đó, rồi tạo lại danh sách mới hoặc gán lại giá trị vào các node cũ. Cách này tốn thêm O(n) bộ nhớ không cần thiết.",
    optimized: "Đảo ngược tại chỗ (in-place) bằng 3 con trỏ: prev (node trước, ban đầu null), curr (node hiện tại, ban đầu là head), và một biến tạm lưu curr.next trước khi ghi đè. Mỗi bước, cho curr.next trỏ ngược về prev, rồi dịch chuyển cả prev và curr về phía trước.",
    steps: [
      "Khởi tạo prev = null, curr = head.",
      "Trong khi curr khác null: lưu nextTemp = curr.next (để không bị mất phần còn lại của danh sách).",
      "Đảo hướng: curr.next = prev.",
      "Dịch chuyển con trỏ: prev = curr, curr = nextTemp.",
      "Lặp lại đến khi curr === null.",
      "Trả về prev — đây chính là head mới của danh sách đã đảo ngược."
    ],
    code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }

        return prev;
    }

    // Demo: tạo danh sách 1->2->3, đảo ngược, in ra các giá trị
    public static void main(String[] args) {
        int[] values = {1, 2, 3, 4, 5};
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int v : values) {
            curr.next = new ListNode(v);
            curr = curr.next;
        }

        ListNode reversed = reverseList(dummy.next);
        StringBuilder sb = new StringBuilder();
        while (reversed != null) {
            sb.append(reversed.val).append(" ");
            reversed = reversed.next;
        }
        System.out.println(sb.toString().trim()); // 5 4 3 2 1
    }
}`,
    timeComplexity: "O(n) — duyệt qua mỗi node đúng 1 lần.",
    spaceComplexity: "O(1) — đảo ngược tại chỗ, không tạo danh sách mới hay dùng đệ quy sâu.",
    similar: ["Reverse Linked List II", "Palindrome Linked List", "Swap Nodes in Pairs"]
  },
  demo: {
    description: "Đảo ngược danh sách liên kết (nhập các số cách nhau bởi dấu phẩy).",
    defaultInput: "1,2,3,4,5",
    fn: (inputStr) => {
      const arr = inputStr.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (arr.length === 0) return "Vui lòng nhập ít nhất 1 số.";
      function Node(val) { this.val = val; this.next = null; }
      let dummy = new Node(0), curr = dummy;
      for (const v of arr) { curr.next = new Node(v); curr = curr.next; }
      let head = dummy.next;

      let prev = null, node = head;
      while (node !== null) {
        const nextTemp = node.next;
        node.next = prev;
        prev = node;
        node = nextTemp;
      }
      const result = [];
      let p = prev;
      while (p) { result.push(p.val); p = p.next; }
      return `Input: [${arr.join(",")}]\nSau khi đảo ngược: [${result.join(",")}]`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Duyệt qua từng node đúng một lần để đảo hướng con trỏ.",
    space: "O(1)",
    spaceDesc: "Chỉ dùng 3 con trỏ tạm, không cấp phát thêm node mới."
  },
  quiz: [
    {
      q: "Vì sao cần lưu curr.next vào biến tạm TRƯỚC KHI gán curr.next = prev?",
      options: [
        "Để code chạy nhanh hơn",
        "Vì nếu không lưu trước, ta sẽ mất tham chiếu tới phần còn lại của danh sách sau khi ghi đè curr.next",
        "Vì JavaScript yêu cầu bắt buộc",
        "Không cần thiết, có thể bỏ qua bước này"
      ],
      correctIndex: 1,
      explain: "Ghi đè curr.next = prev sẽ làm mất con trỏ đến phần còn lại của danh sách nếu không lưu nó vào biến tạm trước."
    },
    {
      q: "Sau vòng lặp đảo ngược, tại sao trả về prev mà không phải curr?",
      options: [
        "Vì curr luôn là null ở cuối vòng lặp, còn prev là node cuối cùng được xử lý — chính là head mới",
        "Vì prev nhanh hơn curr",
        "Cả hai đều đúng, không quan trọng",
        "Vì đề bài yêu cầu vậy, không có lý do kỹ thuật"
      ],
      correctIndex: 0,
      explain: "Khi vòng lặp kết thúc, curr đã đi qua hết danh sách nên là null; prev dừng lại ở node cuối cùng đã xử lý, chính là đầu mới của danh sách đảo ngược."
    }
  ]
}

,

/* ================= 8. TREE / DFS / BFS CƠ BẢN ================= */
{
  id: "tree-dfs-bfs",
  name: "Tree / DFS / BFS cơ bản",
  shortDesc: "Duyệt cây nhị phân theo chiều sâu (DFS) hoặc chiều rộng (BFS) — nền tảng của mọi bài toán về cây.",
  difficultyTag: "Easy",
  definition: "Cây nhị phân (Binary Tree) là cấu trúc dữ liệu gồm các node, mỗi node có tối đa 2 con (left, right). DFS (Depth-First Search) duyệt sâu theo một nhánh trước khi quay lại (thường dùng đệ quy). BFS (Breadth-First Search) duyệt theo từng tầng (level), thường dùng Queue.",
  signals: [
    "Đề bài cho TreeNode hoặc đề cập 'binary tree', 'root'.",
    "Yêu cầu tính độ sâu, so sánh cấu trúc cây, hoặc duyệt theo tầng (level order).",
    "Có nhắc tới 'từ gốc đến lá' (root to leaf) hoặc 'từng tầng' (level by level)."
  ],
  whenToUse: "Dùng DFS khi cần khám phá toàn bộ một nhánh trước (ví dụ: tính chiều sâu, kiểm tra tính đối xứng). Dùng BFS khi cần xử lý theo từng tầng (ví dụ: in ra các node theo từng level, tìm đường đi ngắn nhất trong cây/đồ thị không trọng số).",
  commonMistakes: [
    "Quên xử lý trường hợp node null (cây rỗng hoặc đã duyệt hết một nhánh) — dễ gây lỗi truy cập property của null.",
    "Dùng DFS (đệ quy) cho bài cần duyệt theo tầng, dẫn đến code phức tạp hơn cần thiết — nên dùng BFS với Queue thay vì đệ quy.",
    "Trong BFS, quên lưu kích thước queue tại đầu mỗi tầng trước khi bắt đầu xử lý, dẫn đến nhầm lẫn ranh giới giữa các tầng."
  ],
  thinkingTemplate: "Hỏi: bài toán này cần biết thông tin toàn nhánh (độ sâu, tổng đường đi) hay cần thông tin theo từng tầng (in ra từng level)? Câu trả lời đầu tiên gợi ý DFS (đệ quy), câu trả lời thứ hai gợi ý BFS (Queue).",
  codeTemplate: `import java.util.List;
import java.util.ArrayList;
import java.util.Queue;
import java.util.LinkedList;

// Định nghĩa node (thường đã cho sẵn trong đề bài)
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class TreeTemplate {
    // DFS đệ quy
    public static int dfs(TreeNode node) {
        if (node == null) return 0; // trường hợp gốc (base case)

        int leftResult = dfs(node.left);
        int rightResult = dfs(node.right);

        return 1 + Math.max(leftResult, rightResult); // ví dụ: tính chiều sâu
    }

    // BFS dùng Queue
    public static List<List<Integer>> bfs(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // ranh giới của tầng hiện tại
            List<Integer> level = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            result.add(level);
        }

        return result;
    }
}`,
  examples: [
    { name: "Maximum Depth of Binary Tree", difficulty: "Easy", note: "Bài đại diện bên dưới — DFS đệ quy cơ bản." },
    { name: "Invert Binary Tree", difficulty: "Easy", note: "Đệ quy đổi chỗ left/right của mọi node." },
    { name: "Same Tree", difficulty: "Easy", note: "So sánh cấu trúc 2 cây bằng đệ quy song song." },
    { name: "Binary Tree Level Order Traversal", difficulty: "Medium", note: "BFS dùng Queue, duyệt theo từng tầng." }
  ],
  walkthrough: {
    problemName: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    summary: "Cho root của một cây nhị phân, trả về chiều sâu tối đa (số node trên đường đi dài nhất từ gốc đến lá).",
    ioExample: "Input: root = [3,9,20,null,null,15,7]\nOutput: 3\nGiải thích: đường đi dài nhất là 3 -> 20 -> 15 (hoặc 3 -> 20 -> 7), có 3 node",
    bruteForce: "Không có brute-force 'chậm hơn' rõ ràng cho bài này — bản chất bài toán vốn đã cần duyệt qua mọi node ít nhất 1 lần, nên đệ quy DFS chính là hướng tiếp cận trực tiếp.",
    optimized: "Dùng đệ quy: chiều sâu của một cây = 1 (chính node đó) + chiều sâu lớn hơn giữa 2 cây con trái/phải. Trường hợp gốc: cây rỗng (node null) có chiều sâu 0.",
    steps: [
      "Base case: nếu node là null (cây rỗng), trả về 0.",
      "Đệ quy tính chiều sâu cây con trái: leftDepth = maxDepth(node.left).",
      "Đệ quy tính chiều sâu cây con phải: rightDepth = maxDepth(node.right).",
      "Trả về 1 + Math.max(leftDepth, rightDepth) — cộng 1 cho chính node hiện tại."
    ],
    code: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }

    public static void main(String[] args) {
        // Xây cây [3,9,20,null,null,15,7]
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        System.out.println(maxDepth(root)); // 3
    }
}`,
    timeComplexity: "O(n) — mỗi node được ghé thăm đúng 1 lần.",
    spaceComplexity: "O(h) — với h là chiều cao cây, do call stack của đệ quy; trường hợp xấu nhất (cây lệch hẳn) là O(n).",
    similar: ["Minimum Depth of Binary Tree", "Balanced Binary Tree", "Diameter of Binary Tree"]
  },
  demo: {
    description: "Tính chiều sâu cây nhị phân (nhập dạng level-order, dùng 'null' cho node trống, ví dụ: 3,9,20,null,null,15,7).",
    defaultInput: "3,9,20,null,null,15,7",
    fn: (inputStr) => {
      const tokens = inputStr.split(",").map(t => t.trim());
      if (tokens.length === 0 || tokens[0] === "") return "Vui lòng nhập dữ liệu cây, ví dụ: 3,9,20,null,null,15,7";
      function Node(val) { this.val = val; this.left = null; this.right = null; }
      if (tokens[0] === "null") return "Cây rỗng, chiều sâu = 0";
      const root = new Node(Number(tokens[0]));
      const queue = [root];
      let i = 1;
      while (queue.length > 0 && i < tokens.length) {
        const node = queue.shift();
        if (i < tokens.length) {
          const leftVal = tokens[i++];
          if (leftVal !== "null" && leftVal !== undefined) {
            node.left = new Node(Number(leftVal));
            queue.push(node.left);
          }
        }
        if (i < tokens.length) {
          const rightVal = tokens[i++];
          if (rightVal !== "null" && rightVal !== undefined) {
            node.right = new Node(Number(rightVal));
            queue.push(node.right);
          }
        }
      }
      function maxDepth(node) {
        if (node === null) return 0;
        return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
      }
      return `Input: [${tokens.join(",")}]\nChiều sâu tối đa: ${maxDepth(root)}`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Mỗi node trong cây được ghé thăm đúng một lần.",
    space: "O(h)",
    spaceDesc: "Độ sâu của call stack tỉ lệ với chiều cao cây h (tốt nhất O(log n) nếu cây cân bằng, xấu nhất O(n) nếu cây lệch hẳn)."
  },
  quiz: [
    {
      q: "Khi nào nên dùng BFS thay vì DFS khi duyệt cây?",
      options: [
        "Khi cần xử lý dữ liệu theo từng tầng (level), ví dụ in ra các node theo từng level",
        "Khi cây có ít hơn 10 node",
        "BFS luôn nhanh hơn DFS trong mọi trường hợp",
        "Khi cây không có node lá"
      ],
      correctIndex: 0,
      explain: "BFS tự nhiên xử lý dữ liệu theo tầng vì nó dùng Queue (FIFO) — xử lý hết tầng hiện tại rồi mới sang tầng tiếp theo."
    },
    {
      q: "Trong Maximum Depth of Binary Tree, tại sao base case trả về 0 khi node là null?",
      options: [
        "Vì cây rỗng có chiều sâu 0 — đây là điểm dừng hợp lý cho đệ quy",
        "Vì JavaScript yêu cầu return 0 khi gặp null",
        "Không có lý do đặc biệt, có thể trả về bất kỳ số nào",
        "Để tránh lỗi cú pháp"
      ],
      correctIndex: 0,
      explain: "Base case phải phản ánh đúng thực tế bài toán: một cây/nhánh không tồn tại (null) có chiều sâu là 0, và đây cũng là điều kiện dừng đệ quy."
    }
  ]
},

/* ================= 9. BACKTRACKING CƠ BẢN ================= */
{
  id: "backtracking",
  name: "Backtracking cơ bản",
  shortDesc: "Thử từng lựa chọn, đệ quy tiếp, và 'quay lui' (undo) khi không còn phù hợp — dùng cho bài toán liệt kê tổ hợp.",
  difficultyTag: "Medium",
  definition: "Backtracking là kỹ thuật thử từng lựa chọn có thể tại mỗi bước, đệ quy đi tiếp với lựa chọn đó, và khi quay lại (return từ đệ quy), 'hoàn tác' lựa chọn đó để thử lựa chọn khác. Đây là cách hệ thống để liệt kê mọi khả năng (tổ hợp, hoán vị, subset).",
  signals: [
    "Đề bài yêu cầu liệt kê TẤT CẢ các tổ hợp/hoán vị/tập con thỏa điều kiện.",
    "Có từ khóa: 'tất cả các cách', 'mọi tổ hợp', 'liệt kê'.",
    "Không thể giải bằng công thức trực tiếp — cần thử và loại dần (trial and error) một cách có hệ thống."
  ],
  whenToUse: "Dùng khi cần khám phá toàn bộ không gian lựa chọn (search space) một cách có hệ thống, đặc biệt khi kết quả yêu cầu là TẤT CẢ các phương án hợp lệ, không chỉ 1 phương án tối ưu.",
  commonMistakes: [
    "Quên 'undo' lựa chọn sau khi đệ quy trả về (ví dụ: quên pop() phần tử vừa push() vào path), khiến các nhánh sau bị nhiễm dữ liệu từ nhánh trước.",
    "Copy sai — push trực tiếp path (tham chiếu) vào kết quả thay vì copy giá trị ([...path]), khiến kết quả bị thay đổi ngầm sau đó.",
    "Không có điều kiện dừng (base case) rõ ràng, dẫn đến đệ quy vô hạn hoặc duyệt thừa."
  ],
  thinkingTemplate: "Hỏi: tại mỗi bước, mình có những lựa chọn nào? Sau khi chọn 1 lựa chọn và đệ quy xong, mình cần 'undo' gì để quay lại trạng thái trước đó và thử lựa chọn khác? Đây chính là 3 bước cốt lõi: Chọn (choose) → Khám phá (explore) → Bỏ chọn (un-choose).",
  codeTemplate: `import java.util.List;
import java.util.ArrayList;

public class BacktrackingTemplate {
    public static List<List<Integer>> backtrackingSolve(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        backtrack(nums, 0, path, result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        // Base case: điều kiện để thêm 1 kết quả hợp lệ
        result.add(new ArrayList<>(path)); // luôn copy path, không thêm tham chiếu

        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);              // Bước 1: Chọn
            backtrack(nums, i + 1, path, result); // Bước 2: Khám phá (đệ quy)
            path.remove(path.size() - 1);   // Bước 3: Bỏ chọn (quay lui)
        }
    }
}`,
  examples: [
    { name: "Subsets", difficulty: "Medium", note: "Bài đại diện bên dưới — liệt kê mọi tập con." },
    { name: "Permutations", difficulty: "Medium", note: "Liệt kê mọi hoán vị, dùng mảng 'đã dùng' (used) để tránh trùng phần tử." },
    { name: "Combination Sum", difficulty: "Medium", note: "Tổ hợp có tổng bằng target, cho phép dùng lại phần tử." },
    { name: "Letter Combinations of a Phone Number", difficulty: "Medium", note: "Backtracking trên bảng ánh xạ số điện thoại -> chữ cái." }
  ],
  walkthrough: {
    problemName: "Subsets",
    difficulty: "Medium",
    summary: "Cho mảng số nguyên nums không chứa phần tử trùng lặp, trả về tất cả các tập con có thể (bao gồm cả tập rỗng và chính nó).",
    ioExample: "Input: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    bruteForce: "Có thể dùng bitmask: với n phần tử, có 2^n tập con, mỗi số từ 0 đến 2^n - 1 biểu diễn 1 tập con (bit thứ i = 1 nghĩa là có phần tử i). Cách này hoạt động nhưng khó đọc và khó mở rộng cho bài toán có điều kiện phức tạp hơn.",
    optimized: "Backtracking: tại mỗi bước, với mỗi phần tử bắt đầu từ vị trí start, ta có 2 lựa chọn ngầm — 'lấy' hoặc 'không lấy'. Thay vì if/else tường minh, ta duyệt vòng lặp: mỗi lần thêm 1 phần tử vào path, ghi nhận path hiện tại là 1 tập con hợp lệ, đệ quy tiếp với các phần tử phía sau, rồi bỏ phần tử đó ra để thử nhánh khác.",
    steps: [
      "Khởi tạo result = [] và path = [] (tập con đang xây dựng).",
      "Viết hàm đệ quy backtrack(start): trước tiên, thêm bản copy của path vào result (path hiện tại luôn là một tập con hợp lệ, kể cả rỗng).",
      "Duyệt i từ start đến hết mảng: push nums[i] vào path.",
      "Gọi đệ quy backtrack(i + 1) để tiếp tục xây tập con từ các phần tử phía sau i.",
      "Sau khi đệ quy trả về, pop() phần tử vừa thêm ra khỏi path (quay lui) để thử phần tử tiếp theo trong vòng lặp.",
      "Gọi backtrack(0) để bắt đầu, trả về result."
    ],
    code: `import java.util.List;
import java.util.ArrayList;

public class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        backtrack(nums, 0, path, result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path)); // copy path hiện tại vào kết quả

        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);                    // Chọn
            backtrack(nums, i + 1, path, result);  // Khám phá
            path.remove(path.size() - 1);          // Bỏ chọn (quay lui)
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println(subsets(nums));
        // [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
    }
}`,
    timeComplexity: "O(n * 2^n) — có 2^n tập con, mỗi tập con tốn O(n) để copy vào kết quả.",
    spaceComplexity: "O(n) cho độ sâu đệ quy (không tính kết quả đầu ra), hoặc O(n * 2^n) nếu tính cả bộ nhớ lưu kết quả.",
    similar: ["Permutations", "Combination Sum", "Subsets II"]
  },
  demo: {
    description: "Liệt kê tất cả tập con của một mảng số.",
    defaultInput: "1,2,3",
    fn: (inputStr) => {
      const nums = inputStr.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (nums.length === 0) return "Vui lòng nhập ít nhất 1 số.";
      if (nums.length > 6) return "Để demo chạy nhanh, vui lòng nhập tối đa 6 số.";
      const result = [];
      const path = [];
      function backtrack(start) {
        result.push([...path]);
        for (let i = start; i < nums.length; i++) {
          path.push(nums[i]);
          backtrack(i + 1);
          path.pop();
        }
      }
      backtrack(0);
      const formatted = result.map(s => `[${s.join(",")}]`).join(", ");
      return `Input: [${nums.join(",")}]\nSố tập con: ${result.length}\nKết quả: ${formatted}`;
    }
  },
  complexity: {
    time: "O(n · 2ⁿ)",
    timeDesc: "Có 2ⁿ tập con cần liệt kê, mỗi tập con tốn O(n) để copy.",
    space: "O(n)",
    spaceDesc: "Độ sâu đệ quy tối đa là n (không tính bộ nhớ lưu trữ toàn bộ kết quả đầu ra)."
  },
  quiz: [
    {
      q: "Trong Backtracking, tại sao phải push [...path] (copy) vào result thay vì push(path) trực tiếp?",
      options: [
        "Vì push(path) chạy chậm hơn",
        "Vì path là một mảng dùng chung, tiếp tục bị thay đổi (push/pop) sau đó — nếu không copy, kết quả đã lưu sẽ bị thay đổi theo",
        "Vì JavaScript không cho phép push mảng trực tiếp",
        "Không có sự khác biệt nào"
      ],
      correctIndex: 1,
      explain: "path là tham chiếu (reference) dùng chung xuyên suốt quá trình đệ quy. Nếu không copy, mọi phần tử trong result sẽ cùng trỏ tới path và bị thay đổi theo các lần push/pop tiếp theo."
    },
    {
      q: "Bước path.pop() ở cuối vòng lặp trong Backtracking có ý nghĩa gì?",
      options: [
        "Xóa kết quả sai",
        "Quay lui — hoàn tác lựa chọn vừa thử, để path trở về trạng thái trước đó và có thể thử lựa chọn tiếp theo trong vòng lặp",
        "Tối ưu bộ nhớ, không ảnh hưởng logic",
        "Ngăn chương trình bị lỗi tràn stack"
      ],
      correctIndex: 1,
      explain: "Đây chính là bản chất của 'backtracking' (quay lui): sau khi khám phá xong một nhánh, ta hoàn tác lựa chọn để path đúng trạng thái khi thử nhánh tiếp theo."
    }
  ]
},

/* ================= 10. DYNAMIC PROGRAMMING CƠ BẢN ================= */
{
  id: "dp-basic",
  name: "Dynamic Programming cơ bản",
  shortDesc: "Chia bài toán lớn thành bài toán con nhỏ hơn, lưu lại kết quả đã tính để tránh tính lại (memoization/tabulation).",
  difficultyTag: "Medium",
  definition: "Dynamic Programming (DP) là kỹ thuật giải bài toán bằng cách chia nhỏ thành các bài toán con (subproblem) có cùng cấu trúc, và LƯU LẠI kết quả các bài toán con đã giải (để không tính lại) — gọi là Memoization (lưu từ trên xuống, đệ quy) hoặc Tabulation (lưu từ dưới lên, dùng mảng/bảng).",
  signals: [
    "Đề bài hỏi 'số cách để...', 'giá trị lớn nhất/nhỏ nhất có thể đạt được...'.",
    "Bài toán có thể chia thành các bài toán con nhỏ hơn có cùng dạng (ví dụ: f(n) phụ thuộc vào f(n-1), f(n-2)).",
    "Brute-force đệ quy của bạn tính đi tính lại cùng 1 bài toán con nhiều lần (overlapping subproblems)."
  ],
  whenToUse: "Dùng khi bài toán có 2 tính chất: (1) Cấu trúc con tối ưu (Optimal Substructure) — giải pháp tốt nhất của bài toán lớn được xây từ giải pháp tốt nhất của bài toán con; (2) Bài toán con chồng lấp (Overlapping Subproblems) — cùng một bài toán con được tính đi tính lại nhiều lần nếu dùng đệ quy thuần.",
  commonMistakes: [
    "Viết đệ quy đúng nhưng quên lưu cache (memoization), khiến độ phức tạp vẫn là O(2^n) dù ý tưởng DP đã đúng.",
    "Khởi tạo sai giá trị base case (ví dụ dp[0] hoặc dp[1]) dẫn đến toàn bộ bảng bị sai theo.",
    "Nhầm chỉ số mảng (off-by-one) khi chuyển từ đệ quy sang vòng lặp (tabulation)."
  ],
  thinkingTemplate: "Hỏi: để tính đáp án tại bước n, mình cần biết đáp án của những bước nhỏ hơn nào? Nếu có công thức truy hồi rõ ràng (ví dụ dp[n] = dp[n-1] + dp[n-2]), đó là dấu hiệu DP. Sau đó hỏi tiếp: mình có đang tính lại cùng 1 giá trị nhiều lần không? Nếu có, cần lưu cache.",
  codeTemplate: `import java.util.Map;
import java.util.HashMap;

public class DpTemplate {
    // Cách 1: Memoization (đệ quy + cache, từ trên xuống)
    public static int dpMemo(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) return memo.get(n); // đã tính rồi, lấy từ cache
        if (n <= 1) return n;                         // base case

        int result = dpMemo(n - 1, memo) + dpMemo(n - 2, memo);
        memo.put(n, result);
        return result;
    }

    // Cách 2: Tabulation (vòng lặp + bảng, từ dưới lên)
    public static int dpTabulation(int n) {
        if (n <= 1) return n;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2]; // công thức truy hồi
        }

        return dp[n];
    }
}`,
  examples: [
    { name: "Climbing Stairs", difficulty: "Easy", note: "Bài đại diện bên dưới — công thức truy hồi giống dãy Fibonacci." },
    { name: "House Robber", difficulty: "Medium", note: "Tại mỗi nhà, chọn 'cướp' hoặc 'bỏ qua' dựa trên kết quả tối ưu trước đó." },
    { name: "Min Cost Climbing Stairs", difficulty: "Easy", note: "Tương tự Climbing Stairs nhưng có chi phí, tối thiểu hóa tổng chi phí." },
    { name: "Coin Change", difficulty: "Medium", note: "Số lượng đồng xu tối thiểu để đạt tổng target — DP theo tổng tiền." }
  ],
  walkthrough: {
    problemName: "Climbing Stairs",
    difficulty: "Easy",
    summary: "Bạn đang leo cầu thang, cần n bước để lên đến đỉnh. Mỗi lần bạn có thể leo 1 hoặc 2 bậc. Hỏi có bao nhiêu cách khác nhau để leo lên đỉnh?",
    ioExample: "Input: n = 3\nOutput: 3\nGiải thích: 3 cách là (1+1+1), (1+2), (2+1)",
    bruteForce: "Đệ quy thuần: số cách để leo n bậc = số cách leo (n-1) bậc + số cách leo (n-2) bậc (vì bước cuối cùng hoặc là 1 bậc, hoặc là 2 bậc). Nhưng nếu không lưu cache, cùng một giá trị climbStairs(k) sẽ được tính lại rất nhiều lần — độ phức tạp O(2^n), rất chậm với n lớn.",
    optimized: "Nhận ra đây là bài toán có bài toán con chồng lấp — dùng Tabulation: xây một mảng dp, trong đó dp[i] là số cách leo tới bậc i. Base case: dp[0] = 1 (1 cách duy nhất là đứng yên), dp[1] = 1 (chỉ 1 cách leo 1 bậc để tới bậc 1). Từ đó, dp[i] = dp[i-1] + dp[i-2].",
    steps: [
      "Base case: nếu n <= 1, trả về 1 (chỉ có 1 cách).",
      "Khởi tạo mảng dp với dp[0] = 1, dp[1] = 1.",
      "Duyệt i từ 2 đến n: dp[i] = dp[i-1] + dp[i-2] (bước cuối là 1 bậc từ dp[i-1], hoặc 2 bậc từ dp[i-2]).",
      "Trả về dp[n]."
    ],
    code: `public class Solution {
    public static int climbStairs(int n) {
        if (n <= 1) return 1;

        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(3)); // 3
        System.out.println(climbStairs(5)); // 8
    }
}`,
    timeComplexity: "O(n) — vòng lặp duyệt từ 2 đến n, mỗi bước O(1).",
    spaceComplexity: "O(n) cho mảng dp; có thể tối ưu xuống O(1) nếu chỉ lưu 2 giá trị gần nhất thay vì cả mảng.",
    similar: ["Min Cost Climbing Stairs", "House Robber", "Fibonacci Number"]
  },
  demo: {
    description: "Tính số cách leo cầu thang n bậc (mỗi lần leo 1 hoặc 2 bậc).",
    defaultInput: "5",
    fn: (inputStr) => {
      const n = Number(inputStr.trim());
      if (isNaN(n) || n < 0) return "Vui lòng nhập một số nguyên không âm.";
      if (n > 50) return "Để demo hiển thị gọn, vui lòng nhập n <= 50.";
      if (n <= 1) return `Input: n=${n}\nSố cách: 1`;
      const dp = new Array(n + 1).fill(0);
      dp[0] = 1; dp[1] = 1;
      for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
      return `Input: n=${n}\nSố cách leo lên đỉnh: ${dp[n]}`;
    }
  },
  complexity: {
    time: "O(n)",
    timeDesc: "Một vòng lặp duy nhất từ 2 đến n để điền bảng dp.",
    space: "O(n)",
    spaceDesc: "Lưu toàn bộ mảng dp; có thể giảm còn O(1) nếu chỉ giữ 2 biến gần nhất."
  },
  quiz: [
    {
      q: "Điều kiện nào KHÔNG phải là dấu hiệu của bài toán Dynamic Programming?",
      options: [
        "Bài toán có thể chia thành bài toán con cùng dạng nhỏ hơn (optimal substructure)",
        "Cùng một bài toán con bị tính đi tính lại nhiều lần nếu dùng đệ quy thuần (overlapping subproblems)",
        "Dữ liệu đầu vào phải là một mảng đã sắp xếp",
        "Có công thức truy hồi rõ ràng nối kết đáp án hiện tại với đáp án của bước nhỏ hơn"
      ],
      correctIndex: 2,
      explain: "Sắp xếp không liên quan đến DP — đó là dấu hiệu của Binary Search / Two Pointers. Hai điều kiện cốt lõi của DP là optimal substructure và overlapping subproblems."
    },
    {
      q: "Trong Climbing Stairs, tại sao dp[i] = dp[i-1] + dp[i-2]?",
      options: [
        "Vì đó là công thức Fibonacci, không có lý do liên quan đến đề bài",
        "Vì bước leo cuối cùng để tới bậc i chỉ có thể là 1 bậc (từ bậc i-1) hoặc 2 bậc (từ bậc i-2), nên tổng số cách là tổng của 2 trường hợp đó",
        "Vì công thức này được chứng minh bằng quy nạp toán học không liên quan tới đề",
        "Đây là công thức chỉ đúng ngẫu nhiên với bài này"
      ],
      correctIndex: 1,
      explain: "Đây là bản chất bài toán: mọi cách leo tới bậc i đều kết thúc bằng bước cuối là 1 hoặc 2 bậc, nên tổng số cách bằng tổng số cách đạt tới 2 điểm xuất phát khả dĩ của bước cuối đó."
    }
  ]
},

/* ================= 11. GREEDY CƠ BẢN ================= */
{
  id: "greedy",
  name: "Greedy cơ bản",
  shortDesc: "Tại mỗi bước, chọn lựa chọn tốt nhất ngay lúc đó (local optimal) với hy vọng dẫn tới kết quả tối ưu toàn cục.",
  difficultyTag: "Medium",
  definition: "Greedy (tham lam) là chiến lược tại mỗi bước luôn chọn lựa chọn có lợi nhất ngay lúc đó (local optimal choice), mà không cần xem xét lại các lựa chọn trước đó, với kỳ vọng rằng chuỗi lựa chọn tham lam này dẫn đến kết quả tối ưu toàn cục (global optimal).",
  signals: [
    "Đề bài hỏi giá trị lớn nhất/nhỏ nhất/số lượng tối đa có thể đạt được.",
    "Trực giác cho thấy 'luôn chọn phương án tốt nhất ngay bây giờ' có vẻ hợp lý.",
    "Có thể sắp xếp dữ liệu trước để việc chọn lựa 'tốt nhất tại chỗ' trở nên đơn giản."
  ],
  whenToUse: "Dùng khi có thể CHỨNG MINH (hoặc có lý do vững chắc để tin) rằng chọn lựa tốt nhất tại mỗi bước không bao giờ làm hại tới kết quả tổng thể. Nếu không chắc chắn Greedy đúng, nên thử ngược lại bằng một phản ví dụ (counter-example) trước khi code.",
  commonMistakes: [
    "Áp dụng Greedy cho bài toán mà lựa chọn tốt tại chỗ KHÔNG dẫn tới tối ưu toàn cục (nhiều bài trông giống Greedy nhưng thực chất cần DP).",
    "Không sắp xếp dữ liệu trước khi áp dụng chiến lược tham lam khi thứ tự xử lý ảnh hưởng tới kết quả.",
    "Không kiểm chứng logic tham lam bằng ví dụ nhỏ trước khi code toàn bộ, dẫn tới code sai mà khó phát hiện."
  ],
  thinkingTemplate: "Hỏi: nếu tại bước này mình chọn phương án tốt nhất ngay lúc đó, liệu có bao giờ điều đó khiến kết quả CUỐI CÙNG tệ hơn không? Thử nghĩ một phản ví dụ. Nếu không nghĩ ra phản ví dụ nào sau khi thử vài trường hợp, Greedy có khả năng đúng.",
  codeTemplate: `import java.util.Arrays;

public class GreedyTemplate {
    public static int greedySolve(int[] items) {
        // Bước 1: sắp xếp theo tiêu chí phù hợp (nếu cần)
        Arrays.sort(items);

        int result = 0;
        int state = /* trạng thái ban đầu */ 0;

        // Bước 2: duyệt và luôn chọn phương án tốt nhất tại chỗ
        for (int item : items) {
            if (/* điều kiện item có lợi ngay bây giờ */ true) {
                result++;
                state += item; // cập nhật trạng thái
            }
        }

        return result;
    }
}`,
  examples: [
    { name: "Assign Cookies", difficulty: "Easy", note: "Bài đại diện bên dưới — sắp xếp rồi ghép tham lam." },
    { name: "Can Place Flowers", difficulty: "Easy", note: "Duyệt một lượt, tham lam trồng hoa mỗi khi có thể." },
    { name: "Jump Game", difficulty: "Medium", note: "Theo dõi 'tầm với xa nhất' có thể đạt được (reachable range)." },
    { name: "Gas Station", difficulty: "Medium", note: "Tham lam theo dõi tổng nhiên liệu và điểm bắt đầu khả thi." }
  ],
  walkthrough: {
    problemName: "Assign Cookies",
    difficulty: "Easy",
    summary: "Mỗi trẻ em i có độ 'thèm ăn' greed[i] — chỉ hài lòng nếu được cho cái bánh có kích thước >= greed[i]. Mỗi cái bánh cookies[j] chỉ có thể cho 1 trẻ. Tìm số trẻ em tối đa có thể làm hài lòng.",
    ioExample: "Input: greed = [1,2,3], cookies = [1,1]\nOutput: 1\nGiải thích: chỉ có 2 bánh kích thước 1, chỉ đủ làm hài lòng 1 trẻ có greed = 1",
    bruteForce: "Thử mọi cách ghép trẻ em với bánh (hoán vị/tổ hợp), kiểm tra cách ghép nào làm hài lòng nhiều trẻ nhất. Độ phức tạp rất cao (giai thừa), không khả thi với dữ liệu lớn.",
    optimized: "Sắp xếp cả 2 mảng greed và cookies tăng dần. Dùng 2 con trỏ: luôn thử ghép cái bánh nhỏ nhất còn lại với đứa trẻ có độ thèm ăn nhỏ nhất còn lại — đây là lựa chọn 'tiết kiệm' nhất (dùng bánh nhỏ nhất đủ để làm hài lòng, dành bánh lớn cho trẻ thèm ăn nhiều hơn).",
    steps: [
      "Sắp xếp mảng greed và mảng cookies đều theo thứ tự tăng dần.",
      "Khởi tạo 2 con trỏ childI = 0 (trỏ vào greed) và cookieJ = 0 (trỏ vào cookies), và count = 0.",
      "Trong khi cả 2 con trỏ chưa vượt quá độ dài mảng tương ứng: nếu cookies[cookieJ] >= greed[childI] (bánh đủ lớn làm hài lòng trẻ này), tăng cả 2 con trỏ và count++.",
      "Nếu bánh hiện tại không đủ lớn, chỉ tăng cookieJ (thử bánh lớn hơn tiếp theo, bỏ qua bánh này vì quá nhỏ với mọi trẻ còn lại).",
      "Trả về count khi một trong 2 con trỏ vượt quá độ dài mảng."
    ],
    code: `import java.util.Arrays;

public class Solution {
    public static int findContentChildren(int[] greed, int[] cookies) {
        Arrays.sort(greed);
        Arrays.sort(cookies);

        int childI = 0;
        int cookieJ = 0;
        int count = 0;

        while (childI < greed.length && cookieJ < cookies.length) {
            if (cookies[cookieJ] >= greed[childI]) {
                count++;
                childI++;
                cookieJ++;
            } else {
                cookieJ++; // bánh quá nhỏ, thử bánh tiếp theo
            }
        }

        return count;
    }

    public static void main(String[] args) {
        int[] greed = {1, 2, 3};
        int[] cookies = {1, 1};
        System.out.println(findContentChildren(greed, cookies)); // 1
    }
}`,
    timeComplexity: "O(n log n) — chi phí chính nằm ở việc sắp xếp 2 mảng; phần duyệt sau đó chỉ O(n).",
    spaceComplexity: "O(1) hoặc O(log n) tùy thuật toán sắp xếp — không cần thêm cấu trúc dữ liệu phụ đáng kể.",
    similar: ["Can Place Flowers", "Lemonade Change", "Boats to Save People"]
  },
  demo: {
    description: "Chạy thử Assign Cookies: nhập độ thèm ăn và kích thước bánh.",
    defaultInput: "1,2,3|1,1",
    fn: (inputStr) => {
      const [greedPart, cookiePart] = inputStr.split("|");
      const greed = (greedPart || "").split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      const cookies = (cookiePart || "").split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (greed.length === 0 || cookies.length === 0) return "Định dạng: greed|cookies, ví dụ 1,2,3|1,1";
      greed.sort((a,b) => a-b);
      cookies.sort((a,b) => a-b);
      let childI = 0, cookieJ = 0, count = 0;
      while (childI < greed.length && cookieJ < cookies.length) {
        if (cookies[cookieJ] >= greed[childI]) { count++; childI++; cookieJ++; }
        else cookieJ++;
      }
      return `Greed (đã sắp xếp): [${greed.join(",")}]\nCookies (đã sắp xếp): [${cookies.join(",")}]\nSố trẻ được hài lòng: ${count}`;
    }
  },
  complexity: {
    time: "O(n log n)",
    timeDesc: "Chủ yếu tốn ở bước sắp xếp 2 mảng; phần duyệt tham lam chỉ O(n).",
    space: "O(1)",
    spaceDesc: "Không cần cấu trúc dữ liệu phụ, chỉ vài biến con trỏ và bộ đếm."
  },
  quiz: [
    {
      q: "Trong Assign Cookies, tại sao ta sắp xếp cả 2 mảng trước khi ghép tham lam?",
      options: [
        "Để code chạy đẹp hơn, không ảnh hưởng logic",
        "Để khi ghép 'bánh nhỏ nhất còn lại' với 'trẻ thèm ăn ít nhất còn lại', ta chắc chắn đây là cách dùng bánh tiết kiệm và hợp lý nhất",
        "Vì đề bài yêu cầu bắt buộc phải sắp xếp",
        "Để giảm số lượng phần tử trong mảng"
      ],
      correctIndex: 1,
      explain: "Sắp xếp giúp chiến lược tham lam 'dùng bánh nhỏ nhất đủ dùng cho trẻ ít đòi hỏi nhất' trở nên đúng đắn và dễ chứng minh — đây là điều kiện tiên quyết để Greedy hoạt động đúng ở bài này."
    },
    {
      q: "Điều gì KHÔNG đúng khi nói về thuật toán Greedy nói chung?",
      options: [
        "Greedy luôn cho kết quả đúng với mọi bài toán tối ưu hóa",
        "Greedy chọn lựa chọn tốt nhất tại từng bước mà không xem xét lại",
        "Greedy cần được chứng minh hoặc kiểm chứng kỹ trước khi tin tưởng áp dụng",
        "Một số bài toán trông giống Greedy nhưng thực chất cần Dynamic Programming"
      ],
      correctIndex: 0,
      explain: "Đây là hiểu lầm phổ biến và nguy hiểm — Greedy KHÔNG phải lúc nào cũng đúng. Nó chỉ đúng với những bài toán có tính chất đặc biệt (ví dụ: exchange argument chứng minh được). Nhiều bài trông giống Greedy nhưng thực ra cần DP."
    }
  ]
}

]; // Hết danh sách 11 pattern

/* =========================================================
   TỪ ĐIỂN THUẬT NGỮ
   ========================================================= */
const GLOSSARY = [
  { term: "Array", meaning: "Một danh sách các phần tử được sắp xếp theo thứ tự, truy cập được qua chỉ số (index) bắt đầu từ 0.", example: "let arr = [10, 20, 30]; arr[0] === 10", when: "Xuất hiện trong hầu hết mọi bài LeetCode — là kiểu dữ liệu đầu vào phổ biến nhất." },
  { term: "String", meaning: "Một chuỗi ký tự. Trong nhiều ngôn ngữ, String có thể duyệt như mảng ký tự.", example: "let s = \"hello\"; s[0] === \"h\"", when: "Các bài xử lý văn bản, palindrome, anagram, substring." },
  { term: "Object", meaning: "Cấu trúc dữ liệu lưu theo cặp key-value, key thường là string.", example: "let obj = { a: 1, b: 2 }; obj[\"a\"] === 1", when: "Dùng để đếm tần suất, lưu ánh xạ đơn giản khi không cần các phương thức của Map." },
  { term: "Map", meaning: "Cấu trúc dữ liệu key-value giống Object nhưng cho phép key là bất kỳ kiểu dữ liệu nào, giữ thứ tự chèn, và có phương thức tiện lợi như .has(), .get(), .set().", example: "let m = new Map(); m.set(\"x\", 1); m.get(\"x\") === 1", when: "Bài Two Sum, Frequency Counter, bất cứ đâu cần tra cứu nhanh." },
  { term: "Set", meaning: "Cấu trúc dữ liệu lưu các giá trị DUY NHẤT (không trùng lặp), tra cứu 'có tồn tại không' trong O(1).", example: "let s = new Set([1,2,2,3]); s.size === 3", when: "Bài Contains Duplicate, Sliding Window (kiểm tra ký tự trùng)." },
  { term: "Hash Map", meaning: "Tên gọi chung của cấu trúc key-value có tốc độ tra cứu trung bình O(1), như Map hoặc Object trong JavaScript.", example: "Two Sum dùng Hash Map để tra 'số còn thiếu' trong O(1)", when: "Bất kỳ đâu cần tra cứu nhanh 'giá trị này đã gặp chưa'." },
  { term: "Frequency Counter", meaning: "Kỹ thuật đếm số lần xuất hiện của mỗi phần tử bằng Hash Map, để so sánh hoặc tra cứu nhanh thay vì lặp lại vòng lặp.", example: "Đếm ký tự chuỗi \"aab\" -> {a: 2, b: 1}", when: "Valid Anagram, Group Anagrams, Top K Frequent Elements." },
  { term: "Pointer", meaning: "Một biến chỉ số (index) hoặc tham chiếu dùng để 'trỏ' tới một vị trí trong mảng/chuỗi/danh sách liên kết.", example: "let left = 0; // con trỏ trỏ tới phần tử đầu mảng", when: "Two Pointers, Sliding Window, Linked List." },
  { term: "Two Pointers", meaning: "Kỹ thuật dùng 2 con trỏ di chuyển trên mảng/chuỗi (thường từ 2 đầu vào giữa) để giải bài toán mà không cần vòng lặp lồng nhau.", example: "left=0, right=n-1, tiến vào giữa để tìm cặp tổng = target", when: "Two Sum II, 3Sum, Valid Palindrome, Container With Most Water." },
  { term: "Window", meaning: "Một đoạn con liên tiếp (subarray/substring) đang được xét tại một thời điểm trong thuật toán Sliding Window.", example: "Với s=\"abcabc\", cửa sổ hiện tại có thể là \"abc\" (từ index 0 đến 2)", when: "Bất cứ khi nào cần xét đoạn con liên tiếp." },
  { term: "Sliding Window", meaning: "Kỹ thuật duy trì một 'cửa sổ' (window) trên mảng/chuỗi, mở rộng và thu hẹp bằng 2 con trỏ left/right thay vì tính lại từ đầu.", example: "Tìm chuỗi con dài nhất không lặp ký tự bằng cách mở rộng right, thu hẹp left khi trùng", when: "Longest Substring Without Repeating Characters, Minimum Size Subarray Sum." },
  { term: "Stack", meaning: "Cấu trúc dữ liệu LIFO (vào sau ra trước — Last In First Out). Trong JS, dùng mảng với push()/pop().", example: "let stack = []; stack.push(1); stack.push(2); stack.pop() === 2", when: "Valid Parentheses, Daily Temperatures, Evaluate Reverse Polish Notation." },
  { term: "Queue", meaning: "Cấu trúc dữ liệu FIFO (vào trước ra trước — First In First Out). Trong JS, dùng mảng với push()/shift(), tuy shift() chậm hơn nhưng đơn giản để hiểu.", example: "let queue = []; queue.push(1); queue.push(2); queue.shift() === 1", when: "BFS trên cây/đồ thị, Binary Tree Level Order Traversal." },
  { term: "Linked List", meaning: "Danh sách liên kết — cấu trúc dữ liệu gồm các node nối nhau qua con trỏ 'next', không hỗ trợ truy cập ngẫu nhiên theo index như mảng.", example: "node1.next = node2; node2.next = node3;", when: "Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle." },
  { term: "Node", meaning: "Một đơn vị dữ liệu trong Linked List hoặc Tree, chứa giá trị (value) và một/nhiều con trỏ tới node khác.", example: "{ val: 5, next: null } (node của linked list)", when: "Bất cứ bài nào liên quan Linked List hoặc Tree." },
  { term: "Tree", meaning: "Cấu trúc dữ liệu phân cấp gồm các node, mỗi node có thể có nhiều node con, bắt đầu từ 1 node gốc (root), không có chu trình.", example: "root -> left child, right child -> ...", when: "Mọi bài về Binary Tree, N-ary Tree." },
  { term: "Binary Tree", meaning: "Cây mà mỗi node có tối đa 2 con: left và right.", example: "{ val: 1, left: {val:2}, right: {val:3} }", when: "Maximum Depth of Binary Tree, Invert Binary Tree, Same Tree." },
  { term: "DFS", meaning: "Depth-First Search (Tìm kiếm theo chiều sâu) — duyệt sâu vào một nhánh trước khi quay lại nhánh khác, thường cài đặt bằng đệ quy hoặc Stack.", example: "maxDepth(node) = 1 + max(maxDepth(node.left), maxDepth(node.right))", when: "Duyệt cây/đồ thị khi cần thông tin toàn nhánh (chiều sâu, tổng đường đi)." },
  { term: "BFS", meaning: "Breadth-First Search (Tìm kiếm theo chiều rộng) — duyệt theo từng tầng, thường cài đặt bằng Queue.", example: "Binary Tree Level Order Traversal duyệt từng tầng bằng Queue", when: "Khi cần xử lý dữ liệu theo tầng, hoặc tìm đường đi ngắn nhất trong đồ thị không trọng số." },
  { term: "Recursion", meaning: "Đệ quy — một hàm tự gọi lại chính nó với input nhỏ hơn, có điều kiện dừng (base case) để tránh lặp vô hạn.", example: "function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1); }", when: "DFS trên cây, Backtracking, nhiều bài Dynamic Programming (memoization)." },
  { term: "Backtracking", meaning: "Kỹ thuật thử từng lựa chọn, đệ quy tiếp, và 'hoàn tác' (undo) lựa chọn khi quay lại để thử lựa chọn khác — dùng liệt kê mọi tổ hợp/hoán vị.", example: "Subsets: push phần tử -> đệ quy -> pop phần tử để thử nhánh khác", when: "Subsets, Permutations, Combination Sum, Letter Combinations." },
  { term: "Dynamic Programming", meaning: "Kỹ thuật chia bài toán thành bài toán con, LƯU LẠI kết quả đã tính (cache) để tránh tính lại — áp dụng khi có 'optimal substructure' và 'overlapping subproblems'.", example: "Climbing Stairs: dp[i] = dp[i-1] + dp[i-2]", when: "Climbing Stairs, House Robber, Coin Change." },
  { term: "Memoization", meaning: "Kỹ thuật lưu cache kết quả các bài toán con trong Dynamic Programming theo hướng đệ quy từ trên xuống (top-down).", example: "if (n in memo) return memo[n]; else memo[n] = tính toán rồi lưu lại", when: "Khi viết DP bằng đệ quy và muốn tránh tính lại." },
  { term: "Tabulation", meaning: "Kỹ thuật xây bảng (mảng) kết quả từ dưới lên (bottom-up) trong Dynamic Programming, thường dùng vòng lặp thay vì đệ quy.", example: "for (i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];", when: "Khi muốn tránh giới hạn độ sâu đệ quy, hoặc tối ưu tốc độ." },
  { term: "Greedy", meaning: "Chiến lược tham lam — tại mỗi bước luôn chọn lựa chọn tốt nhất ngay lúc đó (local optimal), với kỳ vọng dẫn tới kết quả tối ưu toàn cục.", example: "Assign Cookies: luôn ghép bánh nhỏ nhất đủ dùng cho trẻ ít đòi hỏi nhất", when: "Assign Cookies, Jump Game, Gas Station — cần kiểm chứng kỹ trước khi tin dùng." },
  { term: "Sorting", meaning: "Sắp xếp — thao tác đưa các phần tử về thứ tự tăng dần hoặc giảm dần, thường là bước tiền xử lý (preprocessing) trước Two Pointers hoặc Greedy.", example: "nums.sort((a,b) => a - b); // sắp xếp tăng dần", when: "3Sum, Assign Cookies, bất cứ bài nào cần dữ liệu có thứ tự trước khi xử lý." },
  { term: "Binary Search", meaning: "Tìm kiếm nhị phân — thuật toán tìm giá trị trong mảng đã sắp xếp bằng cách chia đôi phạm vi tìm kiếm liên tục, đạt độ phức tạp O(log n).", example: "Tìm 9 trong [-1,0,3,5,9,12] chỉ mất tối đa 3 bước so sánh", when: "Bất cứ bài nào có dữ liệu đã sắp xếp và cần tìm kiếm nhanh hơn O(n)." },
  { term: "Time Complexity", meaning: "Độ phức tạp thời gian — ước lượng số bước tính toán một thuật toán cần thực hiện, tính theo kích thước input (thường ký hiệu n).", example: "Duyệt mảng 1 lần: O(n). Duyệt 2 vòng lồng nhau: O(n²)", when: "Luôn cần phân tích sau khi viết xong lời giải, để so sánh các cách tiếp cận." },
  { term: "Space Complexity", meaning: "Độ phức tạp không gian — ước lượng lượng bộ nhớ phụ (ngoài input) mà thuật toán cần dùng.", example: "Dùng thêm 1 Hash Map lưu n phần tử: O(n) space. Chỉ dùng vài biến: O(1) space", when: "Cùng lúc với phân tích Time Complexity, để đánh giá đánh đổi (trade-off)." },
  { term: "Big O", meaning: "Ký hiệu toán học mô tả độ phức tạp trong trường hợp XẤU NHẤT (worst case) khi kích thước input tiến tới vô cùng, bỏ qua các hằng số không đáng kể.", example: "O(n), O(n²), O(log n), O(1), O(n log n)", when: "Dùng để mô tả và so sánh hiệu suất giữa các thuật toán khác nhau." },
  { term: "Edge Case", meaning: "Trường hợp biên — các tình huống đặc biệt dễ bị bỏ sót: mảng rỗng, chỉ 1 phần tử, số âm, giá trị trùng lặp, input rất lớn.", example: "Two Sum với mảng chỉ có 1 phần tử -> không có cặp nào, cần trả về []", when: "Luôn cần kiểm tra trước khi coi lời giải là hoàn chỉnh." },
  { term: "Brute Force", meaning: "Giải pháp 'thô' — thử mọi khả năng một cách trực tiếp mà không tối ưu, thường đúng nhưng chậm (độ phức tạp cao).", example: "Two Sum brute-force: 2 vòng lặp lồng nhau kiểm tra mọi cặp, O(n²)", when: "Bước đầu tiên khi tiếp cận bài toán mới — luôn nghĩ brute-force trước, rồi tìm cách tối ưu." },
  { term: "Optimized Solution", meaning: "Giải pháp đã được cải tiến để giảm độ phức tạp thời gian hoặc không gian so với Brute Force, thường tận dụng cấu trúc dữ liệu phù hợp (Hash Map, Two Pointers, DP...).", example: "Two Sum tối ưu dùng Hash Map: từ O(n²) xuống O(n)", when: "Mục tiêu cuối cùng sau khi đã hiểu rõ brute-force và tìm ra điểm có thể cải thiện." }
];

