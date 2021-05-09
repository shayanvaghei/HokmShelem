import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../shared/models/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  // is an observable to store our user in
  private currentUserSource = new ReplaySubject<User>(1); // 1 is the size of our buffer, how many users do we want to store
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // before we subscribe, we map it to persist
      map((response: User) => {
        const user = response;
        // to check if we have a user at this time
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // in addition to add the user into local storage, we are adding it to observable as well
          this.currentUserSource.next(user); // like adding value to link list
        }

        return user; // to get response while subscribing we need to explicitly return here as well
      })
    );
  }

  // registering a user
  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  } 

  // setting current user
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    // removing user form storage
    localStorage.removeItem('user');
    // removing user from the list
    this.currentUserSource.next(null);
  }


}
