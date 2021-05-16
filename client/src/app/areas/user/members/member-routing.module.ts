import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MembersComponent } from './members.component';


const routes: Routes = [
  { path: '', component: MembersComponent },
  //{ path: ':username', component: MemberDetailComponent },
  { path: ':username', component: MemberDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MemberRoutingModule { }
