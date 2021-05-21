import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/shared/_models/member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = []; // storing information

  constructor(private http: HttpClient) { }

  getMembers() {
    // if members has already been populated then we return an observable of member
    // so we use of
    if(this.members.length > 0) return of(this.members);

    // if we don't have member, then

    // this get function returns an observable with type of array of Member
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        // storing members into memory
        this.members = members;
        return members; // returning member
      })
    )
  }

  getMember(username: string) {
    // get a single member form our ayyar member:
    const member = this.members.find(x => x.username === username);
    // if we do have a member or we have found the member then
    // we return an observable of that member
    if (member !== undefined)
      return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
