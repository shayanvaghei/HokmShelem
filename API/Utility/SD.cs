using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Utility
{
    public static class SD
    {
        public const string Role_Admin = "Admin";
        public const string Role_AssignedAdmin = "AssignedAdmin";
        public const string Role_User = "User";


        public const string UserStatus_Online = "Online";
        public const string UserStatus_Offline = "Offline";
        public const string UserStatus_InGame = "In Game";
        public const string UserStatus_Banned = "Banned";

        public const string PlayerColorBlue = "Blue";
        public const string PlayerColorRed = "Red";


        public const string GameTypeHokm = "Hokm";
        public const string GameTypeShelem = "Shelem";


        // Badge rules: (Upon game won)
        // Starts by Brown = 0
        // 10 - 50 - 100 - 200 - 500 - 1000 - 1500 - 2000 - 3000
        // pink = 0 - 9
        // purple   = 10   -   49
        // red      = 50   -   99
        // green    = 100  -  199
        // brown    = 200  -  499
        // blue     = 500  - 1000
        // grey     = 1000 - 1499
        // orange    = 1500 - 1999
        // diamond  = 2000 - 2999
        // gold     = 3000 - ela mashala
        public const string BadgePink = "pink";
        public const string BadgePurple = "purple";
        public const string BadgeRed = "red";
        public const string BadgeGreen = "green";
        public const string BadgeBrown = "brown";
        public const string BadgeBlue = "blue";
        public const string BadgeGrey = "grey";
        public const string BadgeOrange = "orange";
        public const string BadgeDiamond = "diamond";
        public const string BadgeGold = "gold";


        public static List<string> GetCountriesName()
        {
            return new List<string>() {
                                        "Afghanistan",
                                        "Albania",
                                        "Algeria",
                                        "Andorra",
                                        "Angola",
                                        "Antigua",
                                        "Argentina",
                                        "Armenia",
                                        "Australia",
                                        "Austria",
                                        "Azerbaijan",
                                        "Bahamas",
                                        "Bahrain",
                                        "Bangladesh",
                                        "Barbados",
                                        "Belarus",
                                        "Belgium",
                                        "Belize",
                                        "Benin",
                                        "Bolivia",
                                        "Brazil",
                                        "Brunei",
                                        "Bulgaria",
                                        "Burkina-Faso",
                                        "Burundi",
                                        "Cameroon",
                                        "Canada",
                                        "Chad",
                                        "Chile",
                                        "China",
                                        "Colombia",
                                        "Comoros",
                                        "Costa-Rica",
                                        "Cote-d-Ivoire",
                                        "Croatia",
                                        "Cuba",
                                        "Czech-Republic",
                                        "Denmark",
                                        "Dominica",
                                        "Dominican-Republic",
                                        "Ecuador",
                                        "Egypt",
                                        "El-Salvador",
                                        "Equatorial-Guinea",
                                        "Eritrea",
                                        "Finland",
                                        "France",
                                        "Gambia",
                                        "Georgia",
                                        "Germany",
                                        "Ghana",
                                        "Greece",
                                        "Guinea",
                                        "Guinea-Bissau",
                                        "Guyana",
                                        "Hungary",
                                        "Iceland",
                                        "India",
                                        "Indonesia",
                                        "Iran",
                                        "Iraq",
                                        "Ireland",
                                        "Israel",
                                        "Italy",
                                        "Jamaica",
                                        "Japan",
                                        "Jordan",
                                        "Kazakhstan",
                                        "Kuwait",
                                        "Latvia",
                                        "Lebanon",
                                        "Liberia",
                                        "Libya",
                                        "Lithuania",
                                        "Luxembourg",
                                        "Madagascar",
                                        "Malaysia",
                                        "Maldives",
                                        "Mali",
                                        "Mauritius",
                                        "Mexico",
                                        "Moldova",
                                        "Monaco",
                                        "Mongolia",
                                        "Mozambique",
                                        "Namibia",
                                        "Nauru",
                                        "Nepal",
                                        "Netherlands",
                                        "New-Zealand",
                                        "Nicaragua",
                                        "Nigeria",
                                        "North-Korea",
                                        "Norway",
                                        "Oman",
                                        "Pakistan",
                                        "Palau",
                                        "Palestinian",
                                        "Panama",
                                        "Paraguay",
                                        "Peru",
                                        "Philippines",
                                        "Poland",
                                        "Portugal",
                                        "Qatar",
                                        "Romania",
                                        "Russia",
                                        "Rwanda",
                                        "Samoa",
                                        "Saudi-Arabia",
                                        "Senegal",
                                        "Serbia",
                                        "Singapore",
                                        "Slovakia",
                                        "Slovenia",
                                        "South-Korea",
                                        "South-Africa",
                                        "South-Sudan",
                                        "Spain",
                                        "Sri-Lanka",
                                        "Sudan",
                                        "Sweden",
                                        "Switzerland",
                                        "Syria",
                                        "Taiwan",
                                        "Tajikistan",
                                        "Tanzania",
                                        "Thailand",
                                        "Tunisia",
                                        "Turkey",
                                        "Turkmenistan",
                                        "Ukraine",
                                        "United-Arab-Emirates",
                                        "United-Kingdom",
                                        "United-States-of-America",
                                        "Uruguay",
                                        "Uzbekistan",
                                        "Venezuela",
                                        "Vietnam",
                                        "Yemen",
                                        "Zimbabwe", };
        }
    }
}
