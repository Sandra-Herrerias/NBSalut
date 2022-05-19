import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';
import { CommunicatorService } from 'src/app/services/communicator.service';
// import { DataTableDirective } from 'angular-datatables';
// import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-quarterly-report',
  templateUrl: './quarterly-report.component.html',
  styleUrls: ['./quarterly-report.component.css']
})
export class QuarterlyReportComponent implements OnInit, OnDestroy, AfterViewInit {

  // dtOptions: any | DataTables.Settings = {};
  invoices: any;
  invoicesList: any | [] = [];
  // dtTrigger: Subject<any> = new Subject<any>();
  date = new Date();
  currentYear: number = new Date().getFullYear();
  // @ViewChild(DataTableDirective, { static: false })
  // datatableElement: any = DataTableDirective;
  // dtElement: DataTableDirective | undefined;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isChecked = false;
  isMasterSel: boolean;
  invoicesToSend: any;
  message = '';

  constructor(private http: CommunicatorService/*, private filesaver: FileSaverService*/) {
    this.isMasterSel = false;
    // this.getCheckedItemList();
  }
  ngAfterViewInit(): void {
    $("#datatable").on("click", "tr.rows td", function (e) {
      alert(e.target.innerHTML);
    });
    console.log($("#datatable").DataTable().rows().data());
  }

  someClickHandler(info: any): void {
    this.message = info;
  }

  ngOnInit(): void {
    this.dtOptions = {
      processing: true,
      pagingType: 'full_numbers',
      // language: { url: '//cdn.1s.net/plug-ins/1.12.0/i18n/es-ES.json' },
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
          text: '<i class="bi bi-check-square-fill"></i> Select all', extend: 'selectAll', className: 'btn btn-primary'
        },
        { text: '<i class="bi bi-square"></i> Deselect all', extend: 'selectNone', className: 'btn btn-secondary' },
        {
          text: 'Confirmar para enviar',
          key: '1',
          action: function (e: any, dt: any, node: any, config: any) {
            // alert(dt.rows({ selected: true }).data());
            console.log(dt.rows({ selected: true }).data())
            console.log(dt.api())
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        // $('td', row).off('click');
        $('.select-checkbox', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      },

    };
    this.http.getInvoices().subscribe((response: any) => {
      if (response.success) {
        this.invoices = response.data;
        this.invoicesList = [...this.invoices];
        this.invoicesList.forEach(function (element: { Selected: boolean; }) {
          element.Selected = false;
        });
        // console.log(this.invoicesList)
        this.dtTrigger.next(this.invoices);
        // console.log($("#datatable").DataTable().rows({select: true}).data());
        // console.log(typeof $("#datatable").DataTable().rows().data());
        // this.getCheckedItemList();
      }
    });
  }

  export() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.csv';

    const worksheet = XLSX.utils.json_to_sheet(
      this.invoicesList.filter((e: { Selected: boolean; }) => e.Selected === true));
    const Workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }

    const excelBuffer = XLSX.write(Workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    //this.filesaver.save(blobData, "demoFile");

  }


  checkUncheckAll() {
    // for (var i = 0; i < this.categoryList.length; i++) {
    //   this.categoryList[i].isSelected = this.isMasterSel;
    // }
    this.invoicesList.forEach((invoices: any) => {
      invoices.Selected = this.isMasterSel;
    })
    // this.getCheckedItemList();
    console.log(this.invoicesList)

  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  isAllSelected() {
    this.isMasterSel = this.invoicesList.every(function (item: any) {
      return item.Selected == true;
    })
    // this.getCheckedItemList();
    console.log(this.isMasterSel)
    console.log(this.invoicesList)
  }

  // getCheckedItemList() {
  //   console.log(this.invoicesList)
  //   this.checkedCategoryList = [];
  //   this.invoicesList.forEach((invoices: any) => {
  //     if (this.invoicesList.Selected) {
  //       this.checkedCategoryList.push(invoices);
  //     }
  //   })

  //   this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  // }

}
