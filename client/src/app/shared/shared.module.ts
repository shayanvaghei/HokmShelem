import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberScoresComponent } from './member-scores/member-scores.component';
import { PlayerNameComponent } from './player-name/player-name.component';
import { CountryImageComponent } from './country-image/country-image.component';
import { HeaderNameComponent } from './header-name/header-name.component';


@NgModule({
  declarations: [
    MemberScoresComponent,
    PlayerNameComponent,
    CountryImageComponent,
    HeaderNameComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MemberScoresComponent,
    PlayerNameComponent,
    CountryImageComponent,
    HeaderNameComponent,
    
  ]
})
export class SharedModule { }
