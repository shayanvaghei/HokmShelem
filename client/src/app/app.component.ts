import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HokmShelem';
  users: any;

  constructor(private accountSevice: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    // importing current user from local storage
    // since we have stringify user in our local storage, then we need to JSON parse it
    const user: User = JSON.parse(localStorage.getItem('hokmShelemUser'));
    // setting current user into service
    this.accountSevice.setCurrentUser(user);
  }
}
