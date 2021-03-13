import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { ComponentCanDeactivate } from 'src/app/shared/ComponentCanDeactivate/ComponentCanDeactivate';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent extends ComponentCanDeactivate implements OnInit, AfterViewInit {
  form: FormGroup;
  submitted = false;
  dateValue: Date = new Date();
  formCompleted = false; // check form has been completely filled by user
  constructor(private formBuilder: FormBuilder, private router: Router,
              private modalService: ModalService,
              private utils: UtilsService,
              private ticketService: TicketsService) {
                super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      application: ['', Validators.required],
      category: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', []],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      platform: ['', []],
      dueDate: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(x => {
      console.log('form value changed')
      console.log(x)
    });

   

  }

  ngAfterViewInit() {
    // Mark dueDate as untouched on load as it is making form dirty on load
    this.form.get('dueDate').markAsPristine();
    this.form.get('dueDate').markAsUntouched();
  }

  canDeactivate() {
    if (this.form.dirty && this.form.touched && !this.submitted) {
      // Show confirmation message
      const modalConfig: any = {
        title: 'Confirm!',
        content: `You have unsaved changes to the form. Please save them before you leave.`
      };
      this.modalService.openAppModal(modalConfig);
      return false;
    }
    return true;
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onDateValueChange(date: Date) {
   // this.form.controls['dueDate'].setValue(date, {emitModelToViewChange: true});
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.valid) {
      this.form.value.ticketId = `TS${this.utils.generateRandomNumber(4)}`;
      this.ticketService.createTicket(this.form.value,  () => {
        const modalConfig: any = {
          title: 'Success!',
          content: `${this.form.value.ticketId} ticket created successfully`
        };
        this.modalService.openAppModal(modalConfig);
        return;
      });
     
    }

    this.router.navigate(['tickets']);
  }

}
