import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ErrorGenerateComponent } from './errors/error-generate/error-generate.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundPageComponent } from './errors/not-found-page/not-found-page.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ErrorGenerateComponent,
    NotFoundComponent,
    ServerErrorComponent,
    NotFoundPageComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FormsModule,
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    LoginComponent,
    NavComponent,
    FooterComponent,
    RegisterComponent,
  ]
})
export class SharedModule { }
