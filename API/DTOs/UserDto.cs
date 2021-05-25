using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string Name { get; set; }
    }

    public class UserUpdateDto
    {
        public int Id { get; set; }
        [StringLength(15)]
        public string Name { get; set; }
        [StringLength(2000)]
        public string AboutMe { get; set; }
        [StringLength(40)]
        public string Country { get; set; }
    }
}
