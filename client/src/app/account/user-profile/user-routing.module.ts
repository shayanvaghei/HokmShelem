import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from 'src/app/core/_guards/prevent-unsaved-changes.guard';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from './user-profile.component';


const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'edit', component: UserProfileEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
