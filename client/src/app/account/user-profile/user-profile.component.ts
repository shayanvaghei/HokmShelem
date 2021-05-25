import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/shared/models/member';
import { UserToken } from 'src/app/shared/userToken';
import { AccountService } from 'src/app/account/account.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  member: Member;
  user: UserToken;
  playerIsOnline: boolean;
  photoEditMode = false;

  constructor(private userService: UserService, private accountService: AccountService,
    private toastr: ToastrService) {
    // we need to get current user
    // now our user is current user
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserProfile(this.user.username).subscribe(member => {
      this.member = member;
      
      if (this.member.status === 'Online') {
        this.playerIsOnline = true;
      }
      else {
        this.playerIsOnline = false;
      }
    });
  }

  photoEditToggle() {
    this.photoEditMode = !this.photoEditMode;
  }
}
