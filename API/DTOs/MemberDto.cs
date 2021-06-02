using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        // this is going to be main photo to be sent back to the user (this is not included into AppUser class)
        public string PhotoUrl { get; set; }
        // automapper is going to magically execute GetAge function from the source to populate value into Age
        public int Age { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; } 
        public string Country { get; set; }
        public string AboutMe { get; set; }
        public string Badge { get; set; }
        public int HokmScore { get; set; }
        public int ShelemScore { get; set; }
        public int GamesWon { get; set; }
        public int GamesLost { get; set; }
        public int GamesLeft { get; set; }
        public int TournomenstWon { get; set; }
        public int Views { get; set; } = 0;
        public string Status { get; set; }
        // one user can have many photos
        public ICollection<PhotoDto> Photos { get; set; }
    }

   

}
