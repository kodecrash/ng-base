import { Injectable, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef  } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ModalComponent } from '../shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public bsModalRef: BsModalRef;

  public modalOpen$: Subject<any>;

  constructor(private modalService: BsModalService) {
    this.modalOpen$ = new Subject<any>();
  }

  openModal(template: ElementRef<any>) {
    this.modalOpen$.next(template);
  }

  openAppModal(initialState: any) {
    this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  onModalClose() {
    //this.bsModalRef.onHide(
  }

  getModalRef() {
    return this.bsModalRef;
  }
}
