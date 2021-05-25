import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.css']
})
export class PlayerNameComponent implements OnInit {
  @Input() playerName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
