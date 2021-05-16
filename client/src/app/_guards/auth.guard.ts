import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  // canActivate(): Observable<boolean> {
  //   return this.accountService.currentUser$.pipe(
  //     map(user => {
  //       if (user) return true;

  //       //this.toastr.error('You shall not pass!');
  //       this.router.navigateByUrl('login');
  //     })
  //   );
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth) {
          return true;
        }
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}})
      })
    )
  }


}
