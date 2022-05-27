import { VisitClass } from './../../../models/visit-class.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.css']
})
export class ListVisitComponent implements OnInit {

  //Properties
  listVisits: any | [] = [];
  filteredListVisits: any | [] = [];
  visitSelected !: VisitClass;
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
   * Searchs by firstname, lastname and visit
   */
  search(): void {
    if (!this.inputSearch && !this.inputSearchDate) {
      this.filteredListVisits = this.listVisits;
    } else if (this.inputSearch && !this.inputSearchDate) {
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
    } else if (!this.inputSearch && this.inputSearchDate) {
      this.filteredListVisits = this.listVisits.filter((res: any) => {
        console.log(this.inputSearchDate);
        return (
          res.visit_date
            .includes(this.inputSearchDate)

        );
      });
      this.cp = 1;
    } else if (this.inputSearch && this.inputSearchDate) {
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

  /**
   * Function that asks confirmation to delete the visit and deletes in case confirmation were successful
   * @param visitSelected
   */
  confirmDelete(visitSelected: any): void {
    if (confirm("¿Está segura de eliminar definitivamente esta visita?")) {
      let info = {
        id: visitSelected.id
      }
      this.communicator.delVisit(info).subscribe(
        (result: any) => {
          if (result.success) {
            // this.deleteVisit(visitSelected);
            this.loadVisits();
            this.search();
            alert("Visita eliminada correctamente");
          } else {
            alert("La visita no se ha podido eliminar");
          }
        }
      );
    }
  }

  /**
* This method removes the visit from the list in list visit view.
* @param visitSelected
*/
  deleteVisit(visitSelected: any): void {
    for (let i = 0; i < this.listVisits.length; i++) {
      if (this.listVisits[i].id === visitSelected.id) {
        this.listVisits.splice(i, 1);
        break;
      }
    }
  }

}



