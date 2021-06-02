import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/shared/models/member';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { UserParams } from 'src/app/shared/models/user.Params';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = []; // storing information
  // we are storing our members into map
  // when we use map, we can set and we can get from this
  memberCashe = new Map();
  userParams = new UserParams();

  constructor(private http: HttpClient) { }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams();
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    // we are checking if we have the result cash of from that particular query
    var response = this.memberCashe.get(Object.values(userParams).join('-'));
    // if we do have response from that key
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    if (userParams.badge !== "All")
    {
      params = params.append('badge', userParams.badge);
    }
   
    if (userParams.country !== "All")
    {
      params = params.append('country', userParams.country);
    }

    if (userParams.orderBy !== "All")
    {
      params = params.append('orderBy', userParams.orderBy);
    }

    if (userParams.searchForName !== "")
    {
      params = params.append('searchForName', userParams.searchForName);
    }

    // we are calling getPaginatedResult function and specifying that T is Member[]
    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params).pipe(
      // we have hold of response in here
      map((response => {
        // specifying - for the key
        this.memberCashe.set(Object.values(userParams).join('-'), response);
        return response;
      }))
    )

  }

  getMember(username: string) {
    // // get a single member from our array member:
    // const member = this.members.find(x => x.username === username);
    // // if we do have a member or we have found the member then
    // // we return an observable of that member
    // if (member !== undefined)
    //   return of(member);

    // get all of the values from the memberCash
    const member = [...this.memberCashe.values()]
    // we use to reduce our array into something else
    // we dont want an array of an array of paginated result
    // we want only the result so we use reduce to achive that
    // we have access to previous value here
    // arr is previous value, and we have access to element called elem
    // so basically we are making the array in a simpler way
    // so we have our users flattened into an array
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((member: Member) => member.username === username);

    // if we have found the member from our cashe then we return
    if (member) {
      return of(member);
    }

    console.log(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // Private methods

  // we specify T type so it can be generic
  private getPaginatedResult<T>(url, params) {
    // our result stores here
    // we are specifying that PaginatedResult will take type Member as T
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    // this get function returns an observable with type of array of Member
    // we need to pass on our parameter to the api call (WHY API) so we user observe
    return this.http.get<T>(url, { observe: 'response', params }).pipe(

      // once we are passing the params then it won't get the full response back automatically for us
      // so we user pipe and map function to do ourselve
      // so we use map function to get the hold of the response
      map(response => {
        // so we are setting the paginatedResult.result to the response.body
        // our members will be inside the body
        paginatedResult.result = response.body;
        // we are checking if in the response -> header there is a Pagination 
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })
    )
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    // this lets us to serialize our paramters and helps to pass to the query string
    let params = new HttpParams();

    // we are adding to HttpParams by the following statement
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }
}
