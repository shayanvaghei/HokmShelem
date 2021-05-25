import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-name',
  templateUrl: './header-name.component.html',
  styleUrls: ['./header-name.component.css']
})
export class HeaderNameComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
