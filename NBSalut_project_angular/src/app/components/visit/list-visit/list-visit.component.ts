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
  listVisits: any[] = [];

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
    console.log(this.treatment);
    var response1 = await this.communicator.getVisitsList().toPromise();
    console.log('Response1', response1);
  }

  /**
  * Load data patient from the database
  */
  loadVisits(){
    this.communicator.getVisitsList().subscribe(
      (result: any) => {
        this.listVisits = result;
        console.log(this.listVisits);
        console.log(this.listVisits[0].name);
        console.log(this.listVisits[0].first_name);
      }
    );
    return this.communicator.getVisitsList().toPromise();
  }



  /**
 *TODO NO VA!!!!!!!!!!!!!!!!!!!!!!
 */
  search(): void {
    if (!this.inputSearch) {
      this.ngOnInit();
    } else {
      this.listVisits = this.listVisits.filter(res => {
        return res.first_name.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
          || res.last_name.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
          || res.date.includes(this.inputSearch);
      })
      this.cp = 1;
    }
  }

}
