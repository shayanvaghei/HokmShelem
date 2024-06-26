import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { adminGuard } from '../core/guards/admin.guard';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminComponent},
      { path: 'add-edit-member', component: AddEditMemberComponent},
      { path: 'add-edit-member/:id', component: AddEditMemberComponent},
    ]
  },
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
export class AdminRoutingModule { }
