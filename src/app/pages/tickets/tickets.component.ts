import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { SpinnerService } from '../../services/spinner.service';
import { of, Observable } from 'rxjs';
import { Ticket } from 'src/app/models';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  errorMsg: string;
  tickets$: Observable<Ticket[]>;

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
  };
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

    // getAllTicketsFromDb calls firebase service
    // use getAllTickets to get tickets from JSON service
    this.tickets$ = this.ticketService.getAllTicketsFromDb().pipe(
      map((data) => {
        if (data && data !== null) {
          data[6].assignee = '<a href="javascript:void(0);" class="btn btn-link">John Mike</a>';
          this.spinnerService.hideSpinner();
          return data;
        }
      }),
      catchError(error => {
        this.errorMsg = error;
        this.spinnerService.hideSpinner();
        return of([]);
      })
    );

    // Get Tickets from firebase
  }

  onTableLoad() {
    console.log('Table loaded');
  }

  pageChanged(rows) {
    console.log('Page changed');
    console.log(rows);
  }

}
