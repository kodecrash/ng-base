import { Injectable } from '@angular/core';
import { User } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private db: AngularFireDatabase) {

    const userObj = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userObj));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: User): Observable<any> {
    const url = `${AppConfig.services.loginServiceUrl}?username=${user.username}`;
    return this.http.get<User>(url)
      .pipe(map((userData: User) => {
        // login successful if there's a jwt token in the response
        if (userData && userData.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return userData;
      })
      );
  }

  loginToDb(user: User): Observable<any> {
   return this.db.object(`users/1`).valueChanges().pipe(
    map((userData: User) => {
      // login successful if there's a jwt token in the response
      if (userData && userData.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return userData;
    })
   )
    
  }

  logout() {
    const userObj = sessionStorage.getItem('currentUser');

    if (userObj) {
      sessionStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }
}
