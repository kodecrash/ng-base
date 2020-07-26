import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Ticket } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  tickets: AngularFireList<Ticket>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getAllTickets(): Observable<any> {
    return this.http.get<any>(AppConfig.services.getAllTicketsUrl, this.httpOptions);
  }

  /**
   * Get All tickers from firebase
   */
  getAllTicketsFromDb(): Observable<any> {
    this.tickets = this.db.list('tickets');
    return this.tickets.valueChanges();
  }

  createTicket(ticket: Ticket, callback: () => void) {
    this.tickets = this.db.list('tickets');
    return this.tickets.push(ticket);
    callback();
  }
}
