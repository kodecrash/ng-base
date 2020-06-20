import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentSubscription: Subscription;
  currentUser: User;

  constructor(private authService: AuthenticationService) {
    this.currentSubscription = this.authService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      console.log('Current User');
      console.log(this.currentUser);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentSubscription.unsubscribe();
  }

}
