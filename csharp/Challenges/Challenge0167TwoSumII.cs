namespace Challenges
{
    public class Challenge0167TwoSumII
    {
        // Numbers is already sorted
        public int[] TwoSum(int[] numbers, int target)
        {
            var i = 0;
            var j = numbers.Length - 1;
            var a = numbers[i];
            var b = numbers[j];

            while (i < j)
            {
                if (a + b == target)
                {
                    return new int[] { i + 1, j + 1 };
                }
                else if (a + b < target)
                {
                    i++;
                    a = numbers[i];
                }
                else if (a + b > target)
                {
                    j--;
                    b = numbers[j];
                }
            }

            return null;
        }
    }
}
