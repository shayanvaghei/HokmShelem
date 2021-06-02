using API.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extensions
{
    // this class is an extention to the sent back headers
    // to include PaginationHeader class in it
    public static class HttpExtensions
    {
        // we are not returning anything, we are just adding PaginationHeader into our response
        public static void AddPaginationHeader(this HttpResponse response, 
            int currentPage, int pageSize, int totalCount, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, pageSize, totalCount, totalPages);

            // we want to turn the json file to be camel case instead of title case
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };


            // we are adding into our header called Pagination
            // we need to serialize this because Headers takes a key and a value
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
            // since we are adding a custom header, then we need to add Cors header to make this available
            // this has to be spelt exactly like bellow
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
