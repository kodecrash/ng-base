import { Component, OnInit, Output, AfterViewInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('navAnimButton', {static: false}) navAnimButton: ElementRef;
  @Output() navToggle = new EventEmitter();

  isSideNavOpened = false;

  constructor(private navService: NavService) { }

  ngOnInit() {
  }

  handleNavButton() {
    this.navAnimButton.nativeElement.classList.toggle('open');
    this.isSideNavOpened = !this.isSideNavOpened;
    this.navService.toggleSideNav( this.isSideNavOpened);
  }

  ngAfterViewInit(): void {

  }

}
