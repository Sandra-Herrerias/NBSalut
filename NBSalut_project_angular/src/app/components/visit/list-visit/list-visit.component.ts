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
  listVisits: any | [] = [];
  filteredListVisits: any | [] = [];
  inputSearch: string = '';
  inputSearchDate: string = '';
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
  loadVisits() {
    this.communicator.getVisitsList().subscribe(
      (result: any) => {
        this.listVisits = result;
        this.filteredListVisits = this.listVisits;
      }
    );
    return this.communicator.getVisitsList().toPromise();
  }



  /**
   * Searchs quarterly report component
   */
  search(): void {
    if (!this.inputSearch && !this.inputSearchDate) {
      this.filteredListVisits = this.listVisits;
    } else if(this.inputSearch && !this.inputSearchDate){
      this.filteredListVisits = this.listVisits.filter((res: any) => {
        return (
          res.first_name
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase()) ||
          res.last_name
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase())
        );
      });
      this.cp = 1;
    } else if(!this.inputSearch && this.inputSearchDate){
      this.filteredListVisits = this.listVisits.filter((res: any) => {
        console.log(this.inputSearchDate);
        return (
          res.visit_date
            .includes(this.inputSearchDate)
            
        );
      });
      this.cp = 1;
    }else if(this.inputSearch && this.inputSearchDate){
      this.filteredListVisits = this.listVisits.filter((res: any) => {
        return (
          (res.first_name
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase()) ||
          res.last_name
            .toLocaleLowerCase()
            .includes(this.inputSearch.toLocaleLowerCase())) &&
          res.visit_date
            .includes(this.inputSearchDate)
        );
      });
      this.cp = 1;
    }
  }
}



