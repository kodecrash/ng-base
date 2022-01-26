import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, interval, merge, Observable, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {

  eventsObserveable$: Observable<any>;
  mergedEventsObservable$: Observable<any>;
  inactivityTime: number = 15; // in seconds
  thresholdTime: number = 5; // in seconds (time at which timeout popup will display)
  subscription: Subscription;
  timeoutModalOpen: boolean = false;
  timeLeftForInactive: number;

  private inactivityTimerEvent: Array<any>[] = [
    [document, 'click'], [document, 'wheel'], 
    [document, 'scroll'], [document, 'mousemove'], 
    [document, 'keyup'], [window, 'resize'], 
    [window, 'scroll'], [window, 'mousemove']
  ];

  constructor(public _ngZone: NgZone, private modalService: ModalService,
    private ref: ApplicationRef,
    private authService: AuthenticationService,
    private router: Router) {
 
     }

  initTimeout() {
    let observableArray$: Observable<any>[] = [];
    this.inactivityTimerEvent.forEach(x => {
      observableArray$.push(fromEvent(x[0], x[1]))
    })
    this.mergedEventsObservable$ = merge(...observableArray$);
    this.createTimerObserable();
  }

  createTimerObserable(): void {
    this._ngZone.runOutsideAngular(() => {
      this.eventsObserveable$ = this.mergedEventsObservable$.pipe(
        switchMap((ev) => interval(1000).pipe(take(this.inactivityTime))),
        tap(value => this.isItTimeToShowPopUp(value)),
      );

      this.subscribeObservable();
    });
  }

  subscribeObservable(): void {
    this.subscription = this.eventsObserveable$.subscribe((x) => {
      console.log(`subscribed for ${x + 1} sec`);
    });
  }

  isItTimeToShowPopUp(val: number) {
    this.timeLeftForInactive = this.inactivityTime - val;
    if (this.timeLeftForInactive <= this.thresholdTime) {
       console.log(`You will be logged out in ${this.timeLeftForInactive} seconds`);
       if (this.timeoutModalOpen == false) {
        const modalConfig: any = {
          title: 'Session Timeout!!!',
          content: `You will be logged out in ${this.timeLeftForInactive} seconds`
        };
        this.modalService.openAppModal(modalConfig);
        this.timeoutModalOpen = true;
      } else if (this.timeoutModalOpen == true) {
        this.modalService.bsModalRef["content"].content = `You will be logged out in ${this.timeLeftForInactive} seconds`;
      }
    }
    this.ref.tick();
    if (this.timeLeftForInactive == 1) {
       // Automatically logout from the application
       this.modalService.bsModalRef.hide();
       this.resetTimeout();
       this._ngZone.run(() => {
        this.authService.logout();
        this.router.navigate(['login']);
       });
    }

  }

  resetTimeout() {
    this.subscription.unsubscribe();
    this.timeLeftForInactive = 0;
    this.inactivityTime = 15;
    this.thresholdTime = 5;
    this.timeoutModalOpen = false;
  }
}
