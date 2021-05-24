import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberScoresComponent } from './member-scores/member-scores.component';
import { PlayerNameComponent } from './player-name/player-name.component';
import { CountryImageComponent } from './country-image/country-image.component';
import { HeaderNameComponent } from './header-name/header-name.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [
    MemberScoresComponent,
    PlayerNameComponent,
    CountryImageComponent,
    HeaderNameComponent,
    PhotoGalleryComponent,
  ],
  imports: [
    CommonModule,
    NgxGalleryModule,
    
  ],
  exports: [
    MemberScoresComponent,
    PlayerNameComponent,
    CountryImageComponent,
    HeaderNameComponent,
    PhotoGalleryComponent,
    NgxGalleryModule,
  ]
})
export class SharedModule { }
