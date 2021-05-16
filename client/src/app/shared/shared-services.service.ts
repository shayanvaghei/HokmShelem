import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(this.baseUrl + 'account/getCountries');
  }
}
