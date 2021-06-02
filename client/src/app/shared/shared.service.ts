import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBadges, ICountry, IOrderBy, OrderByLists} from './models/user.Params';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  getBadges() {
    return this.http.get<IBadges[]>(this.baseUrl + 'general/getBadges');
  }

  getCountriesApi() {
    return this.http.get<ICountry[]>(this.baseUrl + 'general/getCountries');
  }

  getOrderByList() {
    const orderByLists = of(OrderByLists);
    return orderByLists;
  }

  getCountries() {
    let countries: Array<string>;
    countries = [
      "--Select your country--",
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
      "Zimbabwe"
    ];
    return countries;
  }
}
