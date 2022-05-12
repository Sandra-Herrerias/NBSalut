import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-quarterly-report',
  templateUrl: './quarterly-report.component.html',
  styleUrls: ['./quarterly-report.component.css']
})
export class QuarterlyReportComponent implements OnInit, OnDestroy {

  dtOptions: any | DataTables.Settings = {};
  invoices: any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: CommunicatorService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: { url: '//cdn.datatables.net/plug-ins/1.12.0/i18n/es-ES.json' },
      dom: 'Bfrtip',
      buttons: [
        'columnsToggle',
        'colvis',
        'copy',
        'print',
        'excel',
      ]
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
