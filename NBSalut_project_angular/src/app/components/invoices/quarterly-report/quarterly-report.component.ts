import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';
import { CommunicatorService } from 'src/app/services/communicator.service';
// import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-quarterly-report',
  templateUrl: './quarterly-report.component.html',
  styleUrls: ['./quarterly-report.component.css']
})
export class QuarterlyReportComponent implements OnInit, OnDestroy {

  // dtOptions: any | DataTables.Settings = {};
  invoices: any;
  // dtTrigger: Subject<any> = new Subject<any>();
  date = new Date();
  currentYear: number = new Date().getFullYear();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | undefined;
  dtOptions: any | DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: CommunicatorService) { }

  ngOnInit(): void {
    this.dtOptions = {
      // select: {
      //   style: 'multi',
      //   info: false
      // },
      processing: true,
      pagingType: 'full_numbers',
      // pageLength: 1,
      language: { url: '//cdn.datatables.net/plug-ins/1.12.0/i18n/es-ES.json' },
      columnDefs: [{
        orderable: false,
        className: 'select-checkbox',
        targets: 0
      }],
      select: {
        style: 'multi',
        selector: 'td:first-child',
        info: false
      },
      dom: 'lBfrtip',
      buttons: [
        { text:'<i class="bi bi-file-earmark-excel"></i> Excel',extend: 'excel', className: 'btn btn-success' },
        { text:'<i class="bi bi-check-square-fill"></i> Select all',extend: 'selectAll', className: 'btn btn-primary' },
        { text:'<i class="bi bi-square"></i> Deselect all', extend: 'selectNone', className: 'btn btn-secondary' },
      ],

    };
    this.http.getInvoices().subscribe((response: any) => {
      if (response.success) {
        this.invoices = response.data;
        this.dtTrigger.next(this.invoices);
        $('.dt-buttons').addClass('text-right');
      }

    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
