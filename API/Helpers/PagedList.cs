using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    // This class is type of generic it can take of any entity
    // for example T could be our MemberDto like PagedList<MemberDto>
    // this is derived from List class which also is type of T
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int totalount, int currentPage, int pageSize)
        {
            CurrentPage = currentPage;
            // for example a total counts of 10 and our page size is 5
            // then it gives us we have 2 pages based on that
            TotalPages = (int) Math.Ceiling(totalount / (double) pageSize);
            PageSize = pageSize;
            TotalCount = totalount;
            // we have access to the items inside our PagedList
            // we are adding the items into this class when we do create a new instance of this

            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        // total count is how many items do we have in this query
        // this could all or some of the users
        public int TotalCount { get; set; }

        // we create a static method that we can call from any where
        // This method is going to receive a query
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int currentPage, int pageSize)
        {
            // how many items are left from this query
            // this does make the database a call
            // this will return the total amount of record we have in the database of type source
            var totalount = await source.CountAsync();
            // for example if we are in page 1, then it is going to be (1 -1) * 5 so we skip nothing and we take 5
            // if we are in page 2 then (2 -1) * 5 so we skip the first 5 and we take the second 5
            var items = await source.Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();

            // we are returning the items, with the how many counts, the pageNumber and the pageSize
            // this static method is going to make an instance of this class and returns the bellow properties
            return new PagedList<T>(items, totalount, currentPage, pageSize);
        }
    }
}
