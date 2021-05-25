import { Component, Input, OnInit } from '@angular/core';
import { PlayerResults} from '../../models/playerResults';

@Component({
  selector: 'app-member-scores',
  templateUrl: './member-scores.component.html',
  styleUrls: ['./member-scores.component.css']
})
export class MemberScoresComponent implements OnInit {
  @Input() playerResults: PlayerResults;
  @Input() ok: number;

  constructor() { }

  ngOnInit(): void {
  }

}
