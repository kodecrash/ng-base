import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string;
  closeBtnName: string;
  content: string;

  constructor(public bsModalRef: BsModalRef) {
    this.content = 'Lorem ipsum is dummy content by lorem ipsum website.';
  }

  ngOnInit() {

  }

}
