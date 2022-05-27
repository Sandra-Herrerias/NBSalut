import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommunicatorService } from "src/app/services/communicator.service";
import { FileSaverService } from "ngx-filesaver";
import { ToastrService } from 'ngx-toastr';
import * as XLSX from "xlsx";
import { User } from "src/app/models/user";
declare var window: any;
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: "app-quarterly-report",
  templateUrl: "./quarterly-report.component.html",
  styleUrls: ["./quarterly-report.component.css"],
})
export class QuarterlyReportComponent implements OnInit {
  invoices: any | [] = [];
  selected: any;
  params: { input: string; startDate: string; endDate: string; sent: string, specialist_id: number } =
    { input: "", startDate: "", endDate: "", sent: "", specialist_id: 0 };
  message = "";
  itemsPerPage: number = 15;
  currentPage: number = 1;
  inputSearch: string = "";
  formModal: any;
  user: any;
  dataToPrint: any | [];
  element: any;
  typeInvoice: boolean = true;
  constructor(
    private http: CommunicatorService,
    private filesaver: FileSaverService,
    private toastr: ToastrService
  ) {
    this.http.user.subscribe(
      resultat => {
        this.user = Object.assign(new User(), resultat);
        this.params.specialist_id = this.user.id;
      }
    )
  }

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
      this.invoices.map((u: any) => ({
        num_factura: u.num_factura,
        fecha: u.fecha, nombre: u.nombre, apellidos: u.apellidos,
        direccion: u.direccion, codigo_postal: u.codigo_postal, dni: u.dni,
        tratamiento: u.tratamiento, precio: u.precio
      }))
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
    this.filesaver.save(blobData, `Factura trimestral ${this.user.first_name} - ${this.user.last_name}`);
  }


  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    this.http.sentInvoicesChecked(this.invoices.map((item: { id: any; }) => item.id)).subscribe((response: any) => {
      if (response.success) {
        this.export();
        this.ngOnInit();
        this.toastr.success('Éxito al marcar facturadas.');
      } else {
        this.toastr.error('Fallo al marcar como facturadas.');
      }
    })
    this.formModal.hide();
  }


  getInvoice(id: number) {

    this.http.getInvoice({invoice_id:id}).subscribe((response: any) => {
      if (response.success) {
        this.dataToPrint =[];
                this.typeInvoice = true;
        this.dataToPrint = response.data;
      }
    });
  }

  getReceipt(id: number) {

    this.http.getInvoice({invoice_id:id}).subscribe((response: any) => {
      if (response.success) {
        this.dataToPrint =[];
        this.typeInvoice = false;
        this.dataToPrint = response.data;
      }
    });
  }

  download(){
    this.element = document.getElementById('invoice');
    html2canvas(this.element).then((canvas: any) => {
      // console.log(canvas);
      var imgData = canvas.toDataURL('image/png');
      var doc = new jspdf("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 0, 0, width, height);
      doc.save('Factura ' + this.dataToPrint[0].invoice_number)
    })
    // this.dataToPrint = [];
  }

  close() {
    this.dataToPrint = undefined;
  }

}
