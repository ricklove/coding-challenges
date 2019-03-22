using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ChallengeTests
{
    public static class AssertExtensions
    {
        public static void Any<T>(this Assert assert, IReadOnlyList<T> list, Expression<Func<T, bool>> predicate) => Assert.IsTrue(list.Any(predicate.Compile()), $"List does not contain expected item {predicate.ToString()}");
        public static void Contains(this Assert assert, IReadOnlyList<string> list, string item) => Assert.IsTrue(list.Contains(item), $"List does not contain expected item: {item}");

        public static void SameContents<T>(this Assert assert, IEnumerable<T> a, IEnumerable<T> b)
            where T : IComparable
        {
            var aItems = a.ToList();
            var bItems = b.ToList();

            Assert.IsTrue(aItems.Count == bItems.Count, $"a and b have different items count: {aItems.Count} != {bItems.Count}");

            for (var i = 0; i < aItems.Count && i < bItems.Count; i++)
            {
                Assert.IsTrue(aItems[i].CompareTo(bItems[i]) == 0, $"Items[{i}] are not the same: {aItems[i]} {bItems[i]}");
            }
        }

        public static void IsTrueFor<T>(this Assert assert, T item, Expression<Func<T, bool>> predicate) =>
            Assert.IsTrue(predicate.Compile()(item), $"Item is not true: {predicate.ToString()}");

        public static void IsTrueForAll<T>(this Assert assert, IReadOnlyList<T> items, Expression<Func<T, bool>> predicate) =>
            Assert.IsTrue(items.All(predicate.Compile()), $"Not All Items Satisfy Predicate: {predicate.ToString()} {items.Select(x => x.ToString()).Take(3).ConcatString("\r\n")}...");

        public static void IsTrueForAny<T>(this Assert assert, IReadOnlyList<T> items, Expression<Func<T, bool>> predicate) =>
            Assert.IsTrue(items.Any(predicate.Compile()), $"No Item Found to Satisfy Predicate: {predicate.ToString()} {items.Select(x => x.ToString()).Take(3).ConcatString("\r\n")}...");

        public static string ConcatString(this IEnumerable<string> text, string delimeter = " ")
        {
            var sb = new StringBuilder();
            var isFirst = true;
            foreach (var item in text)
            {
                if (!isFirst) { sb.Append(delimeter); }
                isFirst = false;
                sb.Append(item);
            }

            return sb.ToString();
        }
    }
}
