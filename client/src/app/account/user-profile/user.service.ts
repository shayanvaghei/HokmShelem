import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/shared/_models/member';
import { UserUpdate } from 'src/app/shared/_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  member: Member; // for storing member into memory
  userUpdate: UserUpdate;

  constructor(private http: HttpClient) { }

  getUserProfile(username: string) {
    // we have a member stored in our memory so we return an observable
    if (this.member !== undefined) {
      return of(this.member);
    }

    // else we call api
    return this.http.get<Member>(this.baseUrl + 'users/' + username).pipe(
      map(member => {
        // storing member into memory
        this.member = member;
        return member;
      })
    )
  }

  getUserForEdit(username: string) {
    if (this.userUpdate !== undefined) {
      return of(this.userUpdate);
    }

    return this.http.get<UserUpdate>(this.baseUrl + 'users/user-edit-profile/' + username).pipe(
      map(userUpdate => {
        this.userUpdate = userUpdate;
        return userUpdate;
      })
    )
  }

  updateUserProfile(userUpdate: UserUpdate) {
    return this.http.put(this.baseUrl + 'users/user-edit-profile', userUpdate).pipe(
      map(() => {
        // storing userUpdate into memory
        this.userUpdate = userUpdate;
        this.member = undefined;
      })
    )
  }
}
