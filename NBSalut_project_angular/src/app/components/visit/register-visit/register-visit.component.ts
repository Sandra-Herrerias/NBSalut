import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {

  listTreatments: TreatmentClass[] = [];

  message: string | undefined;

  public registerVisitForm = this.formBuilder.group({
    name: [
      '',[Validators.required]
    ],
    surnames: [
      '',[Validators.required]
    ],
    numHis: [
      '',[Validators.required]
    ],
    numSeg: [
      '',[Validators.required]
    ]

  });

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService) {
    this.loadTreatments();
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
