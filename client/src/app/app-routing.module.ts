import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './game/lobby/lobby.component';
import { HomeComponent } from './home/home.component';
import { ErrorGenerateComponent } from './shared/errors/error-generate/error-generate.component';
import { NotFoundPageComponent } from './shared/errors/not-found-page/not-found-page.component';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/errors/server-error/server-error.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent}, // when we say empty string, when somebody browses to localhost:4200 this component will be loaded
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', // default pass
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard], // implementing AuthGuard component
    children: [
      {path: 'lobby', component: LobbyComponent},
      // it is going to be activated and loaded when we access member path
      {path: 'members', loadChildren: () => import('./areas/user/members/member.module').then(mod => mod.MemberModule)}, 
    ]
  },
  {path: 'errors', component: ErrorGenerateComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundPageComponent, pathMatch: 'full'}, // this wild card root as user types in that something does not match any of the specified routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
