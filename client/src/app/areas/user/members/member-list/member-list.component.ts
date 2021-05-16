import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.userService.getMembers().subscribe(members => {
      this.members = members;
    })
  }
}
