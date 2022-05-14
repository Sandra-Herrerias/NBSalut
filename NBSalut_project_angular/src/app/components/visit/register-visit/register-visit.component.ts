import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  public checkTypeForm = this.formBuilder.group({
    checkType: [
      '', [Validators.required]
    ]
  })

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
    date: new FormControl((new Date()).toISOString().substring(0, 10))
    ,
    treat: [
      '', [Validators.required]
    ]

  });

  public validatePatientFormDni = this.formBuilder.group({
    dni: [
      '', [Validators.required]
    ]
  });

  public validatePatientFormName = this.formBuilder.group({
    name: [
      '', [Validators.required]
    ],
    surname: [
      '', [Validators.required]
    ]
  });


  // Constructor

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

  /**
   * Load the treatments in the select of the form
   */
  loadTreatmentsSelect() {

    // Multi select Options

    this.selectTreatmentsOptions = {
      idField: 'id',
      textField: 'name',
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      noDataAvailablePlaceholderText: "No hay tratamientos"
    }
  }

  // Multi select testing
  onItemSelect() {
    console.log(this.registerVisitForm.value.treat);
  }
  onSelectAll() {
    console.log(this.registerVisitForm.value.treat);
  }


  /**
   * Check if the user with the DNI given exists in the DDBB
   */
  checkPatientDni() {
    this.communicator.checkPatientDni({
      dni: this.validatePatientFormDni.value.dni
    }).subscribe((res: any) => {
      if (res.success) {
        this.visitPatient = new User(res.user.id,
          res.user.first_name, res.user.last_name,
          res.user.email, res.user.password, res.user.role)
        this.patientExist = true;

        this.registerVisitForm.get('name')?.setValue(this.visitPatient.first_name);
        this.registerVisitForm.get('surnames')?.setValue(this.visitPatient.last_name);
        this.registerVisitForm.get('numHis')?.setValue(res.user.num_clinical_log);

      } else {
        this.route.navigate(['/regpatient']);
      }
    })
  }

  /**
   * Check if the user with the full name given exists in the DDBB
   */
  checkPatientName() {
    this.communicator.checkPatientName({
      name: this.validatePatientFormName.value.name,
      surname: this.validatePatientFormName.value.surname
    }).subscribe((res: any) => {
      if (res.success) {
        this.visitPatient = new User(res.user.id,
          res.user.first_name, res.user.last_name,
          res.user.email, res.user.password, res.user.role)
        this.patientExist = true;

        this.registerVisitForm.get('name')?.setValue(this.visitPatient.first_name);
        this.registerVisitForm.get('surnames')?.setValue(this.visitPatient.last_name);
        this.registerVisitForm.get('numHis')?.setValue(res.user.num_clinical_log);

      } else {
        this.route.navigate(['/regpatient']);
      }
    })
  }

  /**
   * Submit the visit and adds to the DDBB
   */
  addVisit() {
    // console.log(this.registerVisitForm.value);
    // console.log(this.recom);
    // console.log(this.desc);
    // this.onSelectAll();

    // this.registerVisitForm.value.treat.forEach((t: any) => {
    //   let treat: TreatmentClass = new TreatmentClass(
    //     this.getTreatment(t.id)?.id,
    //     this.getTreatment(t.id)?.name,
    //     this.getTreatment(t.id)?.price,
    //     this.getTreatment(t.id)?.description
    //   );
    //   this.listSelectTreatments.push(treat);
    // });

    // console.log("Selected: " + this.listSelectTreatments);
  }

  getTreatment(id: number) {
    return this.listTreatments.find(e => e.id == id);
  }

  facturar() {
    console.log("Abriendo menu de facturacion...");
  }
}
