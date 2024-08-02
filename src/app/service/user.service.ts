import { CacheService } from './cache.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public search = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private CacheService: CacheService) { }

  getAllUsers() {
    const users = JSON.parse(sessionStorage.getItem('users')!);

    if (!users) {
      // console.log("cache miss")

      return this.http.get(environment.baseApi + "users").pipe(
        tap((data: any) => {
          sessionStorage.setItem('users', JSON.stringify(data))
        })
      );
    }
    // console.log("cache hit")
    return of(JSON.parse(sessionStorage.getItem('users')!))
  }

  getUserById(id: any) {
    return this.http.get(environment.baseApi + "users/" + id)
  }
}
