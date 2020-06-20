import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets: Array<any>;
  
  public settings = {
    columns: {
      ticketId: {
        title: 'Ticket Id',
      },
      application: {
        title: 'Application'
      },
      status: {
        title: 'Status'
      },
      priority: {
        title: 'Priority'
      },
      assignee: {
        title: 'Assignee'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  }
  public tableConfig: any = {
    paging: true,
  //  sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered'],
    itemsPerPage: 5
  };

  constructor(private ticketService: TicketsService,
              private spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.ticketService.getAllTickets().subscribe(data => {
      if (data && data !== null) {
        data[6].assignee = '<a href="javascript:void(0);" class="btn btn-link">John Mike</a>';
        this.tickets = data;
       // this.length = data.length;
        this.spinnerService.hideSpinner();
        // this.onChangeTable(this.config);
      }
    });
  }

  onTableLoad() {
    console.log('Table loaded');
  }

  pageChanged(rows) {
    console.log('Page changed');
    console.log(rows);
  }

}
