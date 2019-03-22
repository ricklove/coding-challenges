using System;
using System.Linq;

namespace Challenges
{
    public class Challenge0557
    {
        public class Solution
        {
            public string ReverseWords(string text)
            {
                var revWords = text.Split(' ').Select(x => x.ToCharArray().Reverse());
                var chars = revWords.SelectMany(x => new[] { ' ' }.Concat(x)).ToArray();
                // Remove the first space
                var str = new string(chars).Substring(1);
                return str;
            }
        }

        public static void Expect(Func<string> run, string expected)
        {
            var actual = run();
            if (run() != expected)
            {
                throw new System.Exception($"Fail expected={expected} actual={actual}");
            }
        }

        public static void Test()
        {
            Expect(() => new Solution().ReverseWords(""), "");
            Expect(() => new Solution().ReverseWords("A"), "A");
            Expect(() => new Solution().ReverseWords("ABC"), "CBA");
            Expect(() => new Solution().ReverseWords("A B C"), "A B C");
            Expect(() => new Solution().ReverseWords("Let's take LeetCode contest"), "s'teL ekat edoCteeL tsetnoc");
        }
    }
}
