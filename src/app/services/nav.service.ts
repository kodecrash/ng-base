import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private subject = new Subject<any>();


  constructor() { }

  toggleSideNav(data) {
    this.subject.next({ navData: data });
  }

  onSideNavToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
