import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { UserToken, UserUpdate } from 'src/app/shared/_models/user';
import { AccountService } from '../../account.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm; // this gives us access to our form
  userUpdate: UserUpdate;
  user: UserToken;
  countries: string[];
  // to disable closing the browser accidently or changing the address of the Url
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private userService: UserService, private accountService: AccountService, private toastr: ToastrService,
    private sharedService: SharedService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.userService.getUserForEdit(this.user.username).subscribe(userUpdate => {
      this.userUpdate = userUpdate;
    });

    this.countries = this.sharedService.getCountries();
  }

  updateUser() {
    this.userService.updateUserProfile(this.userUpdate).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      // reset form and pass the member to populate the values
      this.editForm.reset(this.userUpdate);
      this.router.navigateByUrl('user-profile');
    })
    
  }

}
