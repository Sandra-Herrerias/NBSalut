import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.css']
})
export class ListVisitComponent implements OnInit {
  listVisits: any|[] = [];
  filteredPatients: any[] = [];
  nameFilter: String = "";
  surnameFilter: String = "";
  visits: any;
  message = '';
  inputSearch: string = '';
  ipp: number;
  cp: number;
  treatment: any;

  constructor(
    private communicator: CommunicatorService,
    private router: Router
  ) {
    this.ipp = 10;
    this.cp = 1;
  }

 async ngOnInit() {
    this.loadVisits();
  }
  

  /**
  * Load data visit from the database
  */
  loadVisits(){
    this.communicator.getVisitsList().subscribe(
      (result: any) => {
        this.listVisits = result;
      }
    );
    return this.communicator.getVisitsList().toPromise();
  }



  /**
       * filter(): void
       * This method filters the patients array by name and surname
       */
   filter() {
    /*this.filteredPatients = this.listVisits.filter(
      v => {
        if (v.first_name.toLocaleLowerCase().indexOf(this.nameFilter.toLocaleLowerCase()) != -1 &&
          v.last_name.toLocaleLowerCase().indexOf(this.surnameFilter.toLocaleLowerCase()) != -1) {
          return true;
        }
        return false;
      });*/
  }

}
