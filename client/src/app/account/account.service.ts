import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserToken } from '../shared/userToken';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // is an observable to store our user in
  private currentUserSource = new ReplaySubject<UserToken>(1); // 1 is the size of our buffer, how many users do we want to store
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // before we subscribe, we map it to persist
      map((response: UserToken) => {
        const user = response;
        // to check if we have a user at this time
        if (user) {
          this.setCurrentUser(user);
        }

        return user; // to get response while subscribing we need to explicitly return here as well
      })
    );
  }

  // registering a user
  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: UserToken) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  // setting current user
  setCurrentUser(user: UserToken) {
    // storing the user object into localStorage called hokmShelemUser
    localStorage.setItem('hokmShelemUser', JSON.stringify(user));
    // in addition to add the user into local storage, we are adding it to observable as well
    this.currentUserSource.next(user); // like adding value to link list
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
        this.router.navigateByUrl('/'); // users will be redirected to home page after logout
      }
    }, error => {
      console.log(error);
    });
  }


}
