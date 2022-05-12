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
  selectTreatments: any[] = [];
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

    // this.selectTreatments = [
    //   { item_id: 1, item_text: 'Item1' },
    //   { item_id: 2, item_text: 'Item2' },
    //   { item_id: 3, item_text: 'Item3' },
    //   { item_id: 4, item_text: 'Item4' },
    //   { item_id: 5, item_text: 'Item5' }
    // ];


    this.listTreatments.forEach((t: any) => {
      this.selectTreatments.push(
        {
          item_id: t.id,
          item_text: t.name
        }
      )
    });

    this.selectTreatmentsOptions = {
      idField: 'item_id',
      textField: 'item_text'
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
