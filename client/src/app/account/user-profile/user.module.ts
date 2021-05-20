import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';



@NgModule({
  declarations: [
    UserProfileEditComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TabsModule
  ],
  exports: [
    TabsModule,
    UserProfileEditComponent,
    UserProfileComponent
  ]
})
export class UserModule { }
