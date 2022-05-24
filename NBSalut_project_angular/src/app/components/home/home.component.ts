import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user !: User | null;
  totalInvoices: number = 0;

  // dtOptions: any | DataTables.Settings = {};
  // invoices: any;
  // dtTrigger: Subject<any> = new Subject<any>();
  // isChecked: boolean = false;

  constructor(private http: CommunicatorService) { }

  ngOnInit(): void {
    this.user = this.http.usuariData();
    this.http.getTotalInvoices().subscribe((response: any) => {
      if (response.success) {
        this.totalInvoices = response.data;
      }
    })
  }

}
