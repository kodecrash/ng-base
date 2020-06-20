import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  dateValue: Date = new Date();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      applicationName: ['', Validators.required],
      category: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', []],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      platform: ['', []],
      dueDate: [this.dateValue, Validators.required],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onDateValueChange(date: Date) {
   // this.form.controls['dueDate'].setValue(date, {emitModelToViewChange: true});
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      const modalConfig: any = {
        title: 'Success!',
        content: 'Overridden Lorem Ipsum Text'
      };
      this.modalService.openAppModal(modalConfig);
      return;
    }

   this.router.navigate(['home']);
  }

}
