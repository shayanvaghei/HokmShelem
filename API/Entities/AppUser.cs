using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [Required]
        [StringLength(15)]
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        [StringLength(40)]
        public string Country { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(500)]
        public string AboutMe { get; set; }
        public string Badge { get; set; }
        public int HokmScore { get; set; } = 0;
        public int ShelemScore { get; set; } = 0;
        public int GameWon { get; set; } = 0;
        public int GameLost { get; set; } = 0;
        public int GameLeft { get; set; } = 0;
        public int Views { get; set; } = 0;
        public int TournomentWon { get; set; } = 0;
        public int GamesAbandoned{ get; set; } = 0;
        public string Status { get; set; } = SD.UserStatus_Offline;
        public ICollection<Photo> Photos { get; set; }
    }
}
