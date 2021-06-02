import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-score',
  templateUrl: './card-score.component.html',
  styleUrls: ['./card-score.component.css']
})
export class CardScoreComponent implements OnInit {
  @Input() label: string;
  @Input() score: number;

  constructor() { }

  ngOnInit(): void {
  }

}
