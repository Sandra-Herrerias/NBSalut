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
  dtTrigger: Subject<any> = new Subject();
  message = '';
  constructor(private communicator: CommunicatorService, private router: Router) { }

  ngOnInit(): void {
    this.loadVisits();
    console.log(this.listVisits);
  }

   /**
   * Load data patient from the database
   */
    loadVisits() {
      this.communicator.getVisits().subscribe(
        (result: any) => {
          this.listVisits = result;
        }
      );
    }

    
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
