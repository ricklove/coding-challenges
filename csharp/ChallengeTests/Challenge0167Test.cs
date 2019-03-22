using Challenges;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ChallengeTests
{
    [TestClass]
    public class Challenge0167Test
    {
        [TestMethod]
        public void TestMethod01()
        {
            var actual = new Challenge0167TwoSumII().TwoSum(new[] { 2, 7, 11, 15 }, 13);
            // 1 Based Indexes
            var expected = new[] { 0 + 1, 2 + 1 };
            Assert.That.SameContents(expected, actual);
        }

        [TestMethod]
        public void TestMethod02()
        {
            var actual = new Challenge0167TwoSumII().TwoSum(new[] { 2, 3, 4 }, 6);
            // 1 Based Indexes
            var expected = new[] { 0 + 1, 2 + 1 };
            Assert.That.SameContents(expected, actual);
        }


        [TestMethod]
        public void TestMethod03()
        {
            var actual = new Challenge0167TwoSumII().TwoSum(new[] { 0, 0, 0, 0, 2, 3, 4, 7, 8 }, 6);
            // 1 Based Indexes
            var expected = new[] { 4 + 0 + 1, 4 + 2 + 1 };
            Assert.That.SameContents(expected, actual);
        }
    }
}
