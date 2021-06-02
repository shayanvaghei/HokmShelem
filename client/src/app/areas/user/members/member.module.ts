import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MembersComponent } from './members.component';
import { MemberRoutingModule } from './member-routing.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



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
    SharedModule,
    FormsModule
  ],
  exports: [
    TabsModule,
  ]
})
export class MemberModule { }
