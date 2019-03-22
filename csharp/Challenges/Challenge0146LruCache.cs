using System.Collections.Generic;
using System.Linq;

namespace Challenges
{
    public class Challenge0146LruCache
    {
        public class LRUCache : LeastOftenUsedCache<int, int>
        {
            public LRUCache(int capacity) : base(capacity, -1) { }
        }

        // TODO: Change this to LeastRecentlyUsed

        public class LeastOftenUsedCache<TKey, TValue>
        {
            public class ValueWithUsage
            {
                public TKey Key { get; set; }
                public TValue Value { get; set; }
                public int AccessCount { get; set; }
            }

            private readonly int _capacity;
            private readonly Dictionary<TKey, ValueWithUsage> _dictionary;
            private readonly TValue _default;

            public LeastOftenUsedCache(int capacity, TValue defaultValue)
            {
                _capacity = capacity;
                _dictionary = new Dictionary<TKey, ValueWithUsage>(capacity);
                _default = defaultValue;
            }

            public TValue Get(TKey key)
            {
                if (!_dictionary.ContainsKey(key)) { return _default; }

                var val = _dictionary[key];
                val.AccessCount++;
                return val.Value;
            }

            public void Put(TKey key, TValue value)
            {
                if (_dictionary.Count >= _capacity)
                {
                    var leastUsed = _dictionary.Values.OrderBy(x => x.AccessCount).First();
                    _dictionary.Remove(leastUsed.Key);
                }

                _dictionary.Add(key, new ValueWithUsage() { Key = key, Value = value, AccessCount = 0 });
            }
        }


    }
}
