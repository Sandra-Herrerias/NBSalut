import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {

  listTreatments: TreatmentClass[] = [];
  selectTreatments:any[] = [];
  selectTreatmentsOptions: IDropdownSettings = {};

  // No required fields
  recom: string;
  desc: string;

  message: string | undefined;

  // Form builder validator
  public registerVisitForm = this.formBuilder.group({
    name: [
      '', [Validators.required]
    ],
    surnames: [
      '', [Validators.required]
    ],
    numHis: [
      '', [Validators.required]
    ],
    numSeg: [
      '', [Validators.required]
    ],
    date: [
      '', [Validators.required]
    ],
    treat: [
      '', [Validators.required]
    ]

  });

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService) {
    this.loadTreatments();
    this.recom = "";
    this.desc = "";
  }

  ngOnInit(): void {

    

    this.listTreatments.forEach(t => {
      this.selectTreatments.push(
        {
          item_id: t.id,
          item_text: t.name
        }
      )
      console.log(t.name);
    });

    this.selectTreatmentsOptions = {
      idField: 'id',
      textField: 't.name'
    }
  }

  loadTreatments() {
    this.communicator.getTreatments().subscribe((data: any) => {
      data.forEach((t: any) => {
        this.listTreatments.push(new TreatmentClass(t.id, t.name, t.price, t.description));
      })
    })
  }

  addVisit() {
    console.log(this.registerVisitForm.value);
    console.log(this.recom);
    console.log(this.desc);
  }
}
