import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { VisitClass } from 'src/app/models/visit-class.model';


@Component({
  selector: 'app-list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.css']
})
export class ListVisitComponent implements OnInit {
  listVisits: VisitClass[] = []
  listVisitsFilter: VisitClass[] = [];

  visits: any;
  dtTrigger: Subject<any> = new Subject();
  message = '';

  // Pagination
  ipp: number;
  cp: number;

  // Filter
  inputSearch: string = '';

  constructor(private communicator: CommunicatorService, private router: Router) {
    this.ipp = 10;
    this.cp = 1;
   }

  ngOnInit(): void {
    this.loadVisits();
    console.log(this.listVisits);
  }

  /**
  * Load data patient from the database
  */
  loadVisits() {
    this.communicator.getVisits().subscribe((data: any) => {
      data.forEach((v: any) => {
        this.listVisits.push(new VisitClass(v.id, v.name + v.last_name, v.visit_date, v.total_price, v.description));
      })
      this.listVisitsFilter = this.listVisits;
    })
  }

  /**
   * search(): void
   * This method searches in the array by the fields below
   */
   search(): void {
    if (!this.inputSearch) {
      this.ngOnInit();
    } else {
      this.listVisitsFilter = this.listVisits.filter(v => {
        return v.patient.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
        || v.dni.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
      })
      this.cp = 1;
    }
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
