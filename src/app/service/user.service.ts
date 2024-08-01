import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public search = new BehaviorSubject<string>('');



  constructor(private http: HttpClient) { }

  // setSearchText(searchText: string) {
  //   this.searchSubject.next(searchText);
  // }
  getAllUsers() {
    return this.http.get(environment.baseApi + "users")
  }

  getUserById(id: any) {
    return this.http.get(environment.baseApi + "users/" + id)
  }
}
