import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/lobby';

    this.accountService.currentUser$.subscribe(user => {
      if (user != null) {
        // if user is already logged in and try to access login page then navigate back to the home page
        this.router.navigateByUrl('/');
      }
    }, error => {
      console.log(error);
    });
  }

  login() {
    this.accountService.login(this.model).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
      //this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  // logout() {
  //   this.accountService.logout();
  //   this.router.navigateByUrl('/');
  // }
}
