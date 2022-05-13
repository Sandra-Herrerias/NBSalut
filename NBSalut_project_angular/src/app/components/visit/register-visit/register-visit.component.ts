import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {

  listTreatments: TreatmentClass[] = [];
  listSelectTreatments: TreatmentClass[] = [];
  selectTreatmentsOptions: IDropdownSettings = {};

  patientExist: boolean;
  visitPatient: any;

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

  public validatePatientForm = this.formBuilder.group({
    dni: [
      '', [Validators.required]
    ]
  });

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: Router) {
    this.recom = "";
    this.desc = "";
    this.patientExist = false;
  }

  ngOnInit(): void {
    this.loadTreatments();
    this.loadTreatmentsSelect();

    console.log(this.listTreatments);
  }

  loadTreatments() {
    this.communicator.getTreatments().subscribe((data: any) => {
      data.forEach((t: any) => {
        this.listTreatments.push(new TreatmentClass(t.id, t.name, t.price, t.description));
      })
    })
  }

  loadTreatmentsSelect() {

    //console.log(this.selectTreatments);

    // Treatment values

    // this.listTreatments.forEach((t) => {
    //   this.selectTreatments.push({ id: t.id, name: t.name})
    // });

    // Multi select Options

    this.selectTreatmentsOptions = {
      idField: 'id',
      textField: 'name',
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      noDataAvailablePlaceholderText: "No hay tratamientos"
    }
  }

  onItemSelect() {
    console.log(this.registerVisitForm.value.treat);
  }
  onSelectAll() {
    console.log(this.registerVisitForm.value.treat);
  }

  checkPatient() {
    this.communicator.checkPatient({
      dni: this.validatePatientForm.value.dni
    }).subscribe((res: any) => {
      if (res.success) {
        this.visitPatient = new User(res.user.id,
          res.user.first_name, res.user.last_name,
          res.user.email, res.user.password, res.user.role)
        this.patientExist = true;
        console.log(this.visitPatient.name);
      } else {
        this.route.navigate(['/regpatient']);
      }
    })


  }

  addVisit() {
    console.log(this.registerVisitForm.value);
    console.log(this.recom);
    console.log(this.desc);
    this.onSelectAll();

    this.registerVisitForm.value.treat.forEach((t: any) => {
      let treat: TreatmentClass = new TreatmentClass(
        this.getTreatment(t.id)?.id,
        this.getTreatment(t.id)?.name,
        this.getTreatment(t.id)?.price,
        this.getTreatment(t.id)?.description
      );
      this.listSelectTreatments.push(treat);
    });

    console.log("Selected: " + this.listSelectTreatments.toString);
  }

  getTreatment(id: number) {
    return this.listTreatments.find(e => e.id == id);
  }
}
