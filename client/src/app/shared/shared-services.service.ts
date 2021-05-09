import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(this.baseUrl + 'account/getCountries');
  }
}
