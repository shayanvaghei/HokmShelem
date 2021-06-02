using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [StringLength(30)]
        public string Username { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 2, ErrorMessage = "Name must be at least {2}, and maximum {1} characters")]
        [RegularExpression("^[A-Za-z0-9_-]*$", ErrorMessage = "Name should contains only letters or and numbers")]
        public string Name { get; set; }
        [Required]
        [StringLength(40)]
        public string Country { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "Password must be at least {2}, and maximum {1} characters")]
        public string Password { get; set; }
    }
}
