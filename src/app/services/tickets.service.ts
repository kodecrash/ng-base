import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<any> {
    return this.http.get<any>(AppConfig.services.getAllTicketsUrl, this.httpOptions)
    .pipe(map( (data: any) => {
      // login successful if there's a jwt token in the response
      return data;
    }));
  }
}
