import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './game/lobby/lobby.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './core/errors/not-found-page/not-found-page.component';
import { AuthGuard } from './core/_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, // when we say empty string, when somebody browses to localhost:4200 this component will be loaded
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule) },
  {
    path: '', // default pass
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard], // implementing AuthGuard component
    children: [
      { path: 'lobby', component: LobbyComponent },
      // it is going to be activated and loaded when we access member path
      { path: 'members', loadChildren: () => import('./areas/user/members/member.module').then(mod => mod.MemberModule) },
      { path: 'user-profile', loadChildren: () => import('./account/user-profile/user.module').then(mod => mod.UserModule) },
    ]
  },
  { path: 'errors', loadChildren: () => import('./core/errors/error.module').then(mod => mod.ErrorModule) },
  { path: '**', component: NotFoundPageComponent, pathMatch: 'full' }, // this wild card root as user types in that something does not match any of the specified routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
