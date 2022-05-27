import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-template-invoice',
  templateUrl: './template-invoice.component.html',
  styleUrls: ['./template-invoice.component.css']
})
export class TemplateInvoiceComponent implements OnInit {

  invoice: any | [];
  params: { invoice_id: number } = { invoice_id: 0 };
  element: any;
  active: boolean = true;
  constructor(private http: CommunicatorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(Number(this.route.snapshot.paramMap.get("id")))
    if (!isNaN(Number(this.route.snapshot.paramMap.get("id")))) {
      this.params.invoice_id = Number(this.route.snapshot.paramMap.get("id"));
      this.http.getInvoice(this.params).subscribe((response: any) => {
        if (response.success) {
          this.invoice = response.data;
          // console.log(response);
        }
      });
    }

  }

  download() {
    this.active = false;
    this.element = document.getElementById('invoice');
    html2canvas(this.element).then((canvas: any) => {
      // console.log(canvas);
      var imgData = canvas.toDataURL('image/png');
      var doc = new jspdf("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 0, 0, width, height);
      doc.save('Factura ' + this.invoice[0].invoice_number)
      this.active = true;
    })
  }

}
