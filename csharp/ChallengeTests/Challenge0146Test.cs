using Challenges;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ChallengeTests
{
    [TestClass]
    public class Challenge0146Test
    {
        [TestMethod]
        public void TestMethod01()
        {
            var cache = new Challenge0146LruCache.LRUCache(2);

            cache.Put(1, 1);
            cache.Put(2, 2);
            Expect(1, 1);
            cache.Put(3, 3);    // evicts key 2
            Expect(2, -1);
            cache.Put(4, 4);    // evicts key 1
            Expect(1, -1);
            Expect(3, 3);
            Expect(4, 4);

            void Expect(int key, int expected)
            {
                var actual = cache.Get(key);
                Assert.AreEqual(expected, actual, $"{key} key is incorrect");
            }
        }
    }
}
