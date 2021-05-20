import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorGenerateComponent } from './error-generate.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: ErrorGenerateComponent },
  { path: 'page-not-found', component: NotFoundPageComponent },
  { path: 'server-error', component: ServerErrorComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
