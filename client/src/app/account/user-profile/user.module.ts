import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserProfileEditComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TabsModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    TabsModule,
    UserProfileEditComponent,
    UserProfileComponent
  ]
})
export class UserModule { }
