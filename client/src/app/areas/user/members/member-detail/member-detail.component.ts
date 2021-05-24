import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/shared/_models/member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  playerIsOnline: boolean;

  constructor(private memberService: MemberService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    // this.route.snapshot.paramMap.get('username').toLowerCase() =  this takes the parameter passed to the component
    this.memberService.getMember(this.route.snapshot.paramMap.get('username').toLowerCase()).subscribe(member => {
      this.member = member;

      if (this.member.status === 'Online') {
        this.playerIsOnline = true;
      }
      else {
        this.playerIsOnline = false;
      }
    })
  }
}
