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

  user !: User | any;
  totalInvoices: number = 0;
  totalVisits: number = 0;
  totalPatients: number = 0;
  lastsPatients: any;
  lastsVisits: any;
  lastInvoices : any;
  constructor(private http: CommunicatorService) { }

  ngOnInit(): void {
    this.user = Object.assign(new User(), this.http.usuariData()); +
      this.http.getTotalInvoicesBySpecialist(this.user.id).subscribe((response: any) => {
        if (response.success) {
          this.totalInvoices = response.data;
        }
      })

    this.http.getTotalVisitsBySpecialist(this.user.id).subscribe((response: any) => {
      if (response.success) {
        this.totalVisits = response.data;
      }
    })

    this.http.getTotalPatients().subscribe((response: any) => {
      if (response.success) {
        this.totalPatients = response.data;
      }
    })

    this.http.getLastsPatients().subscribe((response: any) => {
      if (response.success) {
        this.lastsPatients = response.data;
      }
    })
    this.http.getLastsVistsBySpecialist(this.user.id).subscribe((response: any) => {
      if (response.success) {
        this.lastsVisits = response.data;
      }
    })
    this.http.getLastsInvoicesBySpecialist(this.user.id).subscribe((response: any) => {
      if (response.success) {
        this.lastInvoices = response.data;
      }
    })

  }

}
