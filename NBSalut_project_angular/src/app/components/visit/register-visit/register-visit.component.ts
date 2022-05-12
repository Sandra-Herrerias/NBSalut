import { Component, OnInit } from '@angular/core';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {

  listTreatments: TreatmentClass[] = [];

  // Fields to validate
  numSeg: number;
  name: string;

  constructor(private communicator: CommunicatorService) {
    this.loadTreatments();

    this.numSeg = 0;
    this.name = "";
   }

  ngOnInit(): void {
  }

  loadTreatments() {
    this.communicator.getTreatments().subscribe((data: any) => {
      data.forEach((t: any) => {
        this.listTreatments.push(new TreatmentClass(t.id,t.name,t.price,t.description));
      })
    })
  }

}
