import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-template-invoice',
  templateUrl: './template-invoice.component.html',
  styleUrls: ['./template-invoice.component.css']
})
export class TemplateInvoiceComponent implements OnInit {

  constructor(private http: CommunicatorService) { }

  ngOnInit(): void {
    
  }

}
