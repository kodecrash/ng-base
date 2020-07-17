import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { AuthenticationService } from './services/authentication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-framework';
  currentUser: User;
  isLoggedIn = false;
  showSpinner = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private spinnerService: SpinnerService,
              private activatedRoute: ActivatedRoute,
    private titleService: Title) {

    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });

    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showSpinner = data ? data : false;
      });
      console.log(this.showSpinner);
    });
  }

  ngOnInit() {
    console.log(this.router['location'].path());
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      this.titleService.setTitle(event['title']);
    });
  }
}
