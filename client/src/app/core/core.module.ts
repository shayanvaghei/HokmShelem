import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundPageComponent } from './errors/not-found-page/not-found-page.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from '../account/login/login.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
    ServerErrorComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [
    FooterComponent,
    NavComponent,
    ServerErrorComponent,
    NotFoundPageComponent,
    BsDropdownModule,
    ToastrModule,
    NgxSpinnerModule
  ]
})
export class CoreModule { }
