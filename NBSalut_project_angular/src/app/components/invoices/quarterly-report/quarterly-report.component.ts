import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CommunicatorService } from 'src/app/services/communicator.service';
// import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-quarterly-report',
  templateUrl: './quarterly-report.component.html',
  styleUrls: ['./quarterly-report.component.css']
})
export class QuarterlyReportComponent implements OnInit, OnDestroy {

  dtOptions: any | DataTables.Settings = {};
  invoices: any;
  dtTrigger: Subject<any> = new Subject<any>();

  // @ViewChild(DataTableDirective, { static: false })
  // datatableElement: any = DataTableDirective;

  constructor(private http: CommunicatorService) { }

  ngOnInit(): void {
    this.dtOptions = {
      select: {
        style: 'multi',
      },
      processing: true,
      pagingType: 'full_numbers',
      // pagingType: 'full_numbers',
      // pageLength: 5,
      language: { url: '//cdn.datatables.net/plug-ins/1.12.0/i18n/es-ES.json' },
      // columnDefs: [{
      //   orderable: false,
      //   className: 'select-checkbox',
      //   targets: 0
      // }],
      // select: {
      //   style: 'os',
      //   selector: 'td:first-child'
      // },
      dom: 'lBfrtip',
      buttons: [
        'excel', 'selectAll', 'selectNone'
      ],

    };
    this.http.getInvoices().subscribe((response: any) => {
      if (response.success) {
        this.invoices = response.data;
        this.dtTrigger.next(this.invoices);
      }

    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
