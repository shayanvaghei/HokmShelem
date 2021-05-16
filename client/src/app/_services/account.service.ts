import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // is an observable to store our user in
  private currentUserSource = new ReplaySubject<User>(1); // 1 is the size of our buffer, how many users do we want to store
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // before we subscribe, we map it to persist
      map((response: User) => {
        const user = response;
        // to check if we have a user at this time
        if (user) {
          localStorage.setItem('hokmShelemUser', JSON.stringify(user));
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
          localStorage.setItem('hokmShelemUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }

  // setting current user
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout(user: string) {
    const logout = {
      username: user
    }

    this.http.post(this.baseUrl + 'account/logout', logout).subscribe(response => {
      if (response) {
        // removing user form storage
        localStorage.removeItem('hokmShelemUser');
        // removing user from the list
        this.currentUserSource.next(null);
        this.toastr.success('User has been sucessully logged out!')

      }
    }, error => {
      console.log(error);
    });
  }


}
