import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// import { Ng2TableModule } from 'ng2-table/ng2-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [],
  imports: [
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    // Ng2TableModule
    Ng2SmartTableModule
  ],
  exports: [
    AccordionModule,
    DatepickerModule,
    BsDatepickerModule,
    ModalModule,
    PaginationModule,
  //  Ng2TableModule
    Ng2SmartTableModule
  ]
})
export class SharedBootstrapModule { }
