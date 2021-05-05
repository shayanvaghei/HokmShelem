import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './game/lobby/lobby.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent}, // when we say empty string, when somebody browses to localhost:4200 this component will be loaded
  {path: 'login', component: LoginComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}, // this wild card root as user types in that something does not match any of the specified routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
