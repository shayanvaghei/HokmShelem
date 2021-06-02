using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    // this class is the parameters to be passed for pagination
    public class UserParams
    {
        // maximum number of page size we are going to return
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 12; // pageSize is set to 10 by default
        public int PageSize
        {
            // we get our _pageSize
            get => _pageSize;
            // for setting, we compare it agains MaxPageSize
            // if it is over our MaxPageSize then we set to max, otherwise its own value
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string Badge { get; set; }
        public string OrderBy { get; set; }
        public string Country { get; set; }
        private string _search;
        public string SearchForName { get; set; }
    }
}
