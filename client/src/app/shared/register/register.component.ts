import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { SharedServicesService } from '../shared-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  countries: any;
  model: any = {};
  modelToSend: any = {};

  constructor(private sharedServices: SharedServicesService, private accountService: AccountService,
     private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      if (user != null) {
        // if user is already logged in and try to access login page then navigate back to the home page
        this.router.navigateByUrl('/');
      }
    }, error => {
      console.log(error);
    });
    
    this.getCountries();
  }

  getCountries() {
    this.sharedServices.getCountries().subscribe(response => {
      //console.log(response);
      this.countries = response;
    }, error =>{
      console.log(error);
    });
    console.log(this.countries);
  }

  register() {
    this.modelToSend.username = this.model.email;
    this.modelToSend.password = this.model.password;

    this.accountService.register(this.modelToSend).subscribe(response => {
      // some stuffs
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
}
