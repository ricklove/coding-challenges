using Challenges;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ChallengeTests
{
    [TestClass]
    public class Challenge0001Test
    {
        [TestMethod]
        public void TestMethod01()
        {
            var actual = new Challenge0001TwoSum().TwoSum(new[] { 5, 7, 13, 8 }, 15);
            var expected = new[] { 1, 3 };
            Assert.That.SameContents(expected, actual);
        }

        [TestMethod]
        public void TestMethod02()
        {
            var actual = new Challenge0001TwoSum().TwoSum(new[] { 3,2,4 }, 6);
            var expected = new[] { 1, 2 };
            Assert.That.SameContents(expected, actual);
        }
    }
}
