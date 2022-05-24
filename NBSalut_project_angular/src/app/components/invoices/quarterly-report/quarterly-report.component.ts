import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommunicatorService } from "src/app/services/communicator.service";
import { FileSaverService } from "ngx-filesaver";
import * as XLSX from "xlsx";
declare var window: any;

@Component({
  selector: "app-quarterly-report",
  templateUrl: "./quarterly-report.component.html",
  styleUrls: ["./quarterly-report.component.css"],
})
export class QuarterlyReportComponent implements OnInit {
  invoices: any;
  selected: any;
  params: { input: string; startDate: string; endDate: string; sent: string } =
    { input: "", startDate: "", endDate: "", sent: "" };

  message = "";
  itemsPerPage: number = 15;
  currentPage: number = 1;
  inputSearch: string = "";
  formModal: any;

  constructor(
    private http: CommunicatorService,
    private filesaver: FileSaverService
  ) { }

  /**
   * Searchs quarterly report component
   */
  search(): void {
    if (!this.inputSearch) {
      this.ngOnInit();
    } else {
      this.invoices = this.invoices.filter((res: any) => {
        return (
          res.first_name
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase()) ||
          res.last_name
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase()) ||
          res.dni
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase())
        );
      });
      this.currentPage = 1;
    }
  }
  /**
   * model change
   * @param $event
   */
  ngModelChange($event: any): void {
    if ($event.endDate) {
      this.params.startDate = $event.startDate.$d.toISOString().slice(0, 10);
      this.params.endDate = $event.endDate.$d.toISOString().slice(0, 10);
      this.http.getInvoices(this.params).subscribe((response: any) => {
        if (response.success) {
          this.invoices = [] = response.data;
        }
      });
    } else {
      this.params.startDate = "";
      this.params.endDate = "";
      this.ngOnInit();
    }
  }
  /**
   * on init
   */
  ngOnInit(): void {
    this.http.getInvoices(this.params).subscribe((response: any) => {
      if (response.success) {
        this.invoices = response.data;
        // console.log(response);
      }
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  getSelected(): void {
    this.ngOnInit();
  }

  /**
   * Exports quarterly report component
   */
  export() {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";

    const worksheet = XLSX.utils.json_to_sheet(
      this.invoices
    );
    const Workbook = {
      Sheets: {
        testingSheet: worksheet,
      },
      SheetNames: ["testingSheet"],
    };

    const excelBuffer = XLSX.write(Workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.filesaver.save(blobData, `Factura trimestral ${this.params.startDate} - ${this.params.endDate}`);
  }

  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    this.formModal.hide();
  }

}
