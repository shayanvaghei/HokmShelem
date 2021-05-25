import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-image',
  templateUrl: './country-image.component.html',
  styleUrls: ['./country-image.component.css']
})
export class CountryImageComponent implements OnInit {
  @Input() countryName: string = null;
  @Input() width: number = 100;
  @Input() height: number = 50;

  constructor() { }

  ngOnInit(): void {
  }

}
