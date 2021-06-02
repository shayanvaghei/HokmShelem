import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/models/member';
import { Pagination } from 'src/app/shared/models/pagination';
import { IBadges, ICountry, IOrderBy, UserParams } from 'src/app/shared/models/user.Params';
import { SharedService } from 'src/app/shared/shared.service';
import { MemberService } from './member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  //members$: Observable<Member[]>;
  // we change our member back to normal
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  members: Member[];
  pagination: Pagination;
  userParams = new UserParams();
  badges: IBadges[];
  countries: ICountry[];
  orderByList: IOrderBy[];
  countrySelected = 'All';
  badgeSelected = 'All';

  constructor(private memberService: MemberService, private sharedServices: SharedService) { 
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
    this.initializeLists();
    
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);

    // our response here is type of PaginatedResul
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  initializeLists() {
    this.sharedServices.getOrderByList().subscribe(response => {
      this.orderByList = [{value: 'all', display: 'All'}, ...response];
    });

    this.sharedServices.getBadges().subscribe(response => {
      this.badges = [{id: 0, name: 'All'}, ...response];
    });

    this.sharedServices.getCountriesApi().subscribe(response => {
      this.countries = [{id: 0, name: 'All'}, ...response];
    });
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  orderBySelect(orderBy) {
    this.userParams.orderBy = orderBy;
    this.loadMembers();
  }

  onSearch() {
    this.userParams.searchForName = this.searchTerm.nativeElement.value;
    this.searchTerm.nativeElement.value = '';
    this.loadMembers();
  }

  onBadgeSelected(badge: string) {
    this.userParams.badge = badge;
    this.loadMembers();
  }

  onCountrySelected(country: string) {
    this.userParams.country = country;
    this.loadMembers();
  }

  onReset() {
    this.userParams = new UserParams();
    this.loadMembers();
  }
}
