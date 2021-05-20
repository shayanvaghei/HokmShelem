import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberScoresComponent } from './member-scores/member-scores.component';


@NgModule({
  declarations: [
    MemberScoresComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MemberScoresComponent,
  ]
})
export class SharedModule { }
