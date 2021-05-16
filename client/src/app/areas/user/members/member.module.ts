import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MembersComponent } from './members.component';
import { MemberRoutingModule } from './member-routing.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';



@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberCardComponent,
    MembersComponent,
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    TabsModule,
    NgxGalleryModule
  ],
  exports: [
    TabsModule,
    NgxGalleryModule
  ]
})
export class MemberModule { }
