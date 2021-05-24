import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    UserProfileEditComponent,
    UserProfileComponent,
    PhotoEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TabsModule,
    SharedModule,
    FormsModule,
    FileUploadModule
  ],
  exports: [
    TabsModule,
    UserProfileEditComponent,
    UserProfileComponent,
    PhotoEditComponent,
    FileUploadModule
  ]
})
export class UserModule { }
