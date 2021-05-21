import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserProfileEditComponent } from 'src/app/account/user-profile/user-profile-edit/user-profile-edit.component';

// this guard prevents the user to leave page of edit-profile page if the user has made some
// changes and intend to leave the page before saving it

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: UserProfileEditComponent): boolean {
      // check if the form of the component is dirty
      if (component.editForm.dirty) {
        return confirm('Are you sure your want to continue? Any unsaved changes will be lost');
      }
    return true;
  }
  
}
