import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  loginForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService, 
    private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
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

  initializeForm() {
    this.loginForm = this.fb.group({
      // name of the variable: ['initial value here', [validation group here]]
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
      //this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
      //console.log(error);
      this.toastr.error(error.error);
    });
  }

  // logout() {
  //   this.accountService.logout();
  //   this.router.navigateByUrl('/');
  // }
}
