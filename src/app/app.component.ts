import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { SpinnerService } from './services/spinner.service';

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
              private spinnerService: SpinnerService) {

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
  }
}
