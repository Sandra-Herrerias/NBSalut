import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';
import { CommunicatorService } from 'src/app/services/communicator.service';
declare var window: any;

@Component({
  selector: 'app-quarterly-report',
  templateUrl: './quarterly-report.component.html',
  styleUrls: ['./quarterly-report.component.css']
})
export class QuarterlyReportComponent implements OnInit, OnDestroy {

  dtElement: DataTableDirective | any;
  dtInstance: Promise<DataTables.Api> | any;

  invoices: any;
  invoicesList: any | [] = [];
  date = new Date();
  currentYear: number = new Date().getFullYear();
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isChecked = false;
  isMasterSel: boolean;
  invoicesToSend: any | [] = [];
  message = '';
  formModal: any;
  showAlert: boolean = false;
  selected: any;

  constructor(private http: CommunicatorService) {
    this.isMasterSel = true;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next;
  }

  someClickHandler(info: any): void {
    // this.message = info;
    // console.log(this.invoicesToSend);
    console.log(info[1]);
    if (this.userExists(info[1])) {
      console.log("ya existe")
      // this.invoicesToSend = this.invoicesToSend.filter((item: { number_invoice: number; }) => item.number_invoice !== 1);
      this.invoicesToSend = this.invoicesToSend.filter(function (item: { number_invoice: any; }) {
        return item.number_invoice !== info[1];
      });
      // console.log(this.invoicesToSend)
      console.log("se elimina" + this.invoicesToSend.length)
    } else {
      // console.log(this.invoicesToSend)
      let invoice = this.invoices.filter((x: { number_invoice: any; }) => x.number_invoice === info[1])[0];
      // var item = this.invoices.find((item: { invoice_date: any; }) => item.invoice_date === info[1]);
      console.log(invoice)
      this.invoicesToSend.push(invoice);
      console.log("se añade" + this.invoicesToSend.length)
      // console.log(this.invoicesToSend)
    }

  }

  userExists(data: any) {
    return this.invoicesToSend.some(function (el: { number_invoice: any; }) {
      return el.number_invoice === data;
    });
  }

  all() {
    this.invoicesToSend = [...this.invoices];
    // console.log(this.invoicesToSend);
    // console.log("se enviand todo!");
  }

  ngOnInit(): void {
    this.dtOptions = {
      processing: true,
      pagingType: 'full_numbers',
      language: { 'url': '//cdn.1s.net/plug-ins/1.12.0/i18n/es-ES.json' },
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
        { text: '<i class="bi bi-file-earmark-excel"></i> Excel', extend: 'excel', className: 'btn btn-success' },
        {
          text: '<i class="bi bi-check-square-fill"></i> Select all', extend: 'selectAll', className: 'btn btn-primary selectAll',
        },
        { text: '<i class="bi bi-square"></i> Deselect all', extend: 'selectNone', className: 'btn btn-secondary selectNone' },
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('.select-checkbox', row).on('click', () => {
          self.someClickHandler(data);
        });
        $('.selectAll').on('click', () => {
          self.all();
        });
        $('.selectNone').on('click', () => {
          self.selectNone();
        });
        // return row;
      },

    };
    this.http.getInvoices().subscribe((response: any) => {
      if (response.success) {
        this.invoices = response.data;
        this.invoicesList = [...this.invoices];
        this.dtTrigger.next(this.invoices);
      }
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  selectNone() {
    this.invoicesToSend = [];
  }

  openFormModal() {
    this.formModal.show();
  }

  saveSomeThing() {
    // confirm or save something
    this.showAlert = true;
    this.formModal.hide();
  }

  change($event: any): void {
    let startDate = new Date($event.startDate.$d);
    let endDate = new Date($event.endDate.$d);
    console.log(new Intl.DateTimeFormat(['en', 'id']).format(startDate));
    console.log(new Intl.DateTimeFormat(['en', 'id']).format(endDate));
    this.http.getInvoicesBetweenDates({
      startDate: new Intl.DateTimeFormat(['en', 'id']).format(startDate),
      endDate: new Intl.DateTimeFormat(['en', 'id']).format(endDate)
    }).subscribe((response: any) => {
      if (response.success) {
        this.invoices = response.data;
        this.invoicesList = [...this.invoices];
        this.dtTrigger.next;
        this.rerender();
      }
      // console.log(response)
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  clear():void{
    this.http.getInvoices().subscribe((response: any) => {
      if (response.success) {
        this.rerender();
        this.invoices = response.data;
        this.invoicesList = [...this.invoices];
        this.dtTrigger.next(this.invoices);
      }
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next;
    });
  }

}
