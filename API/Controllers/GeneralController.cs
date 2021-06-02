using API.DTOs.General;
using API.Utility;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class GeneralController : BaseApiController
    {
        [HttpGet("getBadges")]
        public ActionResult<List<Badges>> GetBadges()
        {
            return new List<Badges>()
            {
                new Badges{ Id = 1, Name = SD.BadgePink},
                new Badges{ Id = 2, Name = SD.BadgePurple},
                new Badges{ Id = 3, Name = SD.BadgeRed},
                new Badges{ Id = 4, Name = SD.BadgeGreen},
                new Badges{ Id = 5, Name = SD.BadgeBrown},
                new Badges{ Id = 6, Name = SD.BadgeBlue},
                new Badges{ Id = 7, Name = SD.BadgeGrey},
                new Badges{ Id = 8, Name = SD.BadgeOrange},
                new Badges{ Id = 9, Name = SD.BadgeDiamond},
                new Badges{ Id = 10, Name = SD.BadgeGold}
            };
        }

        [HttpGet("getCountries")]
        public ActionResult<List<Country>> GetCountries()
        {
            var countriesToReturn = new List<Country>();
            var countries = SD.GetCountriesName();
            for (int i = 0; i < countries.Count; i++)
            {
                countriesToReturn.Add(new Country { Id = i + 1 , Name = countries[i]});
            }

            return countriesToReturn;
        }
    }
}
