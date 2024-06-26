import { Component, HostListener, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { take } from 'rxjs';
import { ApplicationUser } from './shared/models/account/applicationUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.refreshUser();
  }

  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  checkUserActivity() {
    this.accountService.applicationUser$.pipe(take(1)).subscribe({
      next: (user: ApplicationUser | null) => {
        if (user) {
          clearTimeout(this.accountService.timeoutId);
          this.accountService.checkUserIdleTimout();
        }
      }
    })
  }

  refreshUser() {
    const jwt = this.accountService.getJwt();
    if (jwt) {
      this.accountService.refreshApplicationUser(jwt).subscribe({
        next: _ => { },
        error: _ => {
          this.accountService.logout();
        }
      })
    } else {
      this.accountService.refreshApplicationUser(null).subscribe();
    }
  }
}