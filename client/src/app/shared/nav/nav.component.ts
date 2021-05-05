import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  collapsed = true;

  constructor(public accountService: AccountService, private router: Router, private roastr: ToastrService) { }

  ngOnInit(): void {
  }

  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/'); // users will be redirected to home page after logout
  }
}
