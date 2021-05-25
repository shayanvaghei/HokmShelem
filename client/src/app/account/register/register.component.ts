import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  countries: any;
  modelToSend: any = {};

  // used for reactive form
  registerForm: FormGroup;
  // used for display any validation errors thrown back from the API (WHY API)
  // we have to initialize the validation array
  // because we are checking for the lnegth in the html template
  validationErrors: string[] = [];

  // fb is FormBuilder service so we use that to create our form
  constructor(private sharedService: SharedService, private accountService: AccountService,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.accountService.currentUser$.subscribe(user => {
      if (user != null) {
        // if user is already logged in and try to access login page then navigate back to the home page
        this.router.navigateByUrl('/');
      }
    }, error => {
      console.log(error);
    });

    this.countries = this.sharedService.getCountries();
    //console.log(this.countries);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      // name of the variable: ['initial value here', [validation group here]]
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern("^[A-Za-z0-9_-]*$")]],
      username: ['', [Validators.required, Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      country: ['', [Validators.required, Validators.maxLength(40)]],
      dateOfBirth: [new Date('Jan 01, 2000, 21:43:11 UTC'), Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confrimPassword: ['', [Validators.required, this.matchPasswords('password')]]
    })

    // if the password matches at first and then the user tried to change the value of password,
    // so we check again for the matching of both passwords
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confrimPassword.updateValueAndValidity();
    })
  }

  // to compare confirm password with password
  // custom validator which returns Validator function
  matchPasswords(matchTo: string): ValidatorFn {
    // all of our FormControl is derived from AbstractControl
    return (control: AbstractControl) => {
      // first control is the control of ConfirmPassword
      // the second control is the one that we sent which here is (password FormControl)
      // if true then we return null indicates it is matching
      // it it fails then we return isMatching true
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true } //isMatching is a custom name
    }
  }

  register() {
    console.log(this.registerForm.controls.dateOfBirth.value);

    this.accountService.register(this.registerForm.value).subscribe(response => {
      // some stuffs
      this.router.navigateByUrl('/lobby');
    }, error => {
      // if there is an error thrown back from the API then we fill in validationErrors array
      this.validationErrors = error;
    });
  }
}
