import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/shared/_models/member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  member: Member;

  constructor(private http: HttpClient) { }

  getUserProfile(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
