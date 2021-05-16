import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MembersComponent } from './members.component';
import { MemberRoutingModule } from './member-routing.module';



@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberCardComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule
  ],
})
export class MemberModule { }
