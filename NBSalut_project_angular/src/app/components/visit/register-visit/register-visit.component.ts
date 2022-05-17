import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, CheckboxRequiredValidator, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { VisitClass } from 'src/app/models/visit-class.model';


@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {

  // Variables

  listTreatments: TreatmentClass[] = [];
  listSelectTreatments: TreatmentClass[] = [];
  selectTreatmentsOptions: IDropdownSettings = {};

  listVisits: VisitClass[] = [];

  patientExist: boolean;
  visitPatient: any;

  file: File | null = null;

  message: string | undefined;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Form builder

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
      ''
    ],
    dni: [
      '', [Validators.required]
    ],
    facturation: [
      true
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // Constructor & ngOnInit

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: Router) {
    this.patientExist = false;
  }

  ngOnInit(): void {
    this.loadTreatments();
    this.loadTreatmentsSelect();

    //console.log(this.listTreatments);
    //console.log(this.listVisits);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Loading elements functions

  loadVisits(patient: any) {
    this.communicator.getVisitsPatient(patient).subscribe((data: any) => {
      data.forEach((t: any) => {
        this.listVisits.push(new VisitClass(t.id, t.first_name + " " + t.last_name, t.visit_date, t.price, t.visit_description));
      })
    })
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Testing functions

  // Multi select testing
  onItemSelect() {
    console.log(this.registerVisitForm.value.treat);
  }
  onSelectAll() {
    console.log(this.registerVisitForm.value.treat);
  }

  // Facturation checkbox

  checked() {
    console.log(this.registerVisitForm.value.facturation);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Inputs functions

  handleFileInput(files: FileList) {
    this.file = files.item(0);
}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Checking if patient exists functions

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
        this.registerVisitForm.get('dni')?.setValue(res.user.dni);


        this.loadVisits(res.user);
        console.log(this.listVisits);


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

        this.loadVisits(res.user);
        console.log(this.listVisits);

      } else {
        this.route.navigate(['/regpatient']);
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Create visit functions

  /**
   * Submit the visit and adds to the DDBB
   */
  addVisit() {

    // let visit = {
    //   num: this.registerVisitForm.value.numHis,
    //   dni: this.registerVisitForm.value.dni,
    //   name: this.registerVisitForm.value.name,
    //   surname: this.registerVisitForm.value.surnames,
    //   date: this.registerVisitForm.value.date,
    //   treats: this.registerVisitForm.value.treat,
    //   facturate: this.registerVisitForm.value.facturation,
    //   description: "Paciente tratado por Jordi",
    //   document: this.registerVisitForm.value.document
    // };

    console.log("Visita del formulario: " + {
      num: this.registerVisitForm.value.numHis,
      dni: this.registerVisitForm.value.dni,
      name: this.registerVisitForm.value.name,
      surname: this.registerVisitForm.value.surnames,
      date: this.registerVisitForm.value.date,
      treats: this.registerVisitForm.value.treat,
      facturate: this.registerVisitForm.value.facturation,
      description: "Paciente tratado por Jordi"
      //document: this.registerVisitForm.value.document
    });


    console.log("Visita registrada: " + this.communicator.registerVisit(
      {
        num: this.registerVisitForm.value.numHis,
        dni: this.registerVisitForm.value.dni,
        name: this.registerVisitForm.value.name,
        surname: this.registerVisitForm.value.surnames,
        date: this.registerVisitForm.value.date,
        treats: this.registerVisitForm.value.treat,
        facturate: this.registerVisitForm.value.facturation,
        description: "Paciente tratado por Jordi",
        document: this.registerVisitForm.value.document
      }
    ));

  }
}
