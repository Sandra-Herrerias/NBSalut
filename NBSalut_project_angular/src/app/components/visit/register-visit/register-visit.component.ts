import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {

  listTreatments: string[] = [];

  constructor(private communicator: CommunicatorService) { }

  ngOnInit(): void {
  }

  loadData() {
    this.communicator.getTreatments().subscribe((data: any) => {
      data.forEach((treatment: any) => {
        this.listTreatments.push(treatment.name);
      })
    })
  }

}
