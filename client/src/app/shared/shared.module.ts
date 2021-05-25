import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberScoresComponent } from './components/member-scores/member-scores.component';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { CountryImageComponent } from './components/country-image/country-image.component';
import { HeaderNameComponent } from './components/header-name/header-name.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TextInputComponent } from './components/forms-input/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './components/forms-input/date-input/date-input.component';

@NgModule({
  declarations: [
    MemberScoresComponent,
    PlayerNameComponent,
    CountryImageComponent,
    HeaderNameComponent,
    PhotoGalleryComponent,
    TextInputComponent,
    DateInputComponent
  ],
  imports: [
    CommonModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    MemberScoresComponent,
    PlayerNameComponent,
    CountryImageComponent,
    HeaderNameComponent,
    PhotoGalleryComponent,
    NgxGalleryModule,
    TextInputComponent,
    BsDatepickerModule,
    DateInputComponent
  ]
})
export class SharedModule { }
