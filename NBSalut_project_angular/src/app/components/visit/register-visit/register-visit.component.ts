import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  //#region Variables

  // Variables

  listTreatments: TreatmentClass[] = [];
  listSelectTreatments: TreatmentClass[] = [];
  selectTreatmentsOptions: IDropdownSettings = {};
  tFound: any;

  listVisits: VisitClass[] = [];
  actualVisit: any;

  genInvoice: any;

  patientExist: boolean;
  visitPatient: any;
  visitPatientId: number;

  fileBlob: File | null = null;

  message: string | undefined;

  //#endregion


  //#region Formbuilder Forms

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
      '', [Validators.required]
    ],
    dni: [
      '', [Validators.required, this.createDniValidator()]
    ],
    facturation: [
      true
    ],
    file: [
      ''
    ],
    fileSource: [
      ''
    ],
    desc: [
      ''
    ]

  });

  public validatePatientFormDni = this.formBuilder.group({
    dni: [
      '', [Validators.required, this.createDniValidator()]
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

  //#endregion


  //#region Initialize Section

  // Constructor & ngOnInit

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: Router) {
    this.patientExist = false;
    this.visitPatientId = -1;
  }

  ngOnInit(): void {
    this.loadTreatments();
    this.loadTreatmentsSelect();

    //console.log(this.listTreatments);
    //console.log(this.listVisits);
  }

  //#endregion


  //#region Loading Functions

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

  //#endregion


  //#region Testing

  // Testing functions

  // Multi select testing
  onItemSelect() {
    console.log(this.registerVisitForm.value.treat);
  }
  onSelectAll() {
    console.log(this.registerVisitForm.value.treat);
  }

  //#endregion


  //#region Facturation Checkbox

  // Facturation checkbox

  checked() {
    console.log(this.registerVisitForm.value.facturation);

  }

  //#endregion


  //#region Files Functions

  // Inputs functions

  onFileChange(event: any) {

    //   if (event.target.value) {
    //     const file = event.target.files[0];
    //     const type = file.type;
    //     this.changeFile(file).then((base64: string): any => {
    //         console.log(base64);
    //         this.fileBlob = this.b64Blob([base64], type);
    //         console.log(this.fileBlob)
    //     });
    // } else alert('Nothing')
  }

  changeFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  //#endregion


  //#region Checking Patient Functions

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
        this.visitPatientId = res.user.id;

        this.registerVisitForm.get('name')?.setValue(this.visitPatient.first_name);
        this.registerVisitForm.get('surnames')?.setValue(this.visitPatient.last_name);
        this.registerVisitForm.get('numHis')?.setValue(res.user.num_clinical_log);
        this.registerVisitForm.get('dni')?.setValue(res.user.dni);


        this.loadVisits(res.user);
        //console.log(this.listVisits);


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
        this.visitPatientId = res.user.id;

        this.registerVisitForm.get('name')?.setValue(this.visitPatient.first_name);
        this.registerVisitForm.get('surnames')?.setValue(this.visitPatient.last_name);
        this.registerVisitForm.get('numHis')?.setValue(res.user.num_clinical_log);

        this.loadVisits(res.user);
        //console.log(this.listVisits);

      } else {
        this.route.navigate(['/regpatient']);
      }
    })
  }

  //#endregion


  //#region Validations

  createDniValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      var numero;
      var letr;
      var letra;
      var expresion_regular_dni;
      var dniValid = false;
      expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

      if (expresion_regular_dni.test(value) == true) {
        numero = value.substr(0, value.length - 1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        letr = value.substr(value.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr.toUpperCase()) {
          //alert('Dni erroneo, la letra del NIF no se corresponde');
          dniValid = false;
        } else {
          //alert('Dni correcto');
          dniValid = true;
        }
      } else {
        //alert('Dni erroneo, formato no válido');
        dniValid = false;
      }
      return !dniValid ? { correctDni: true } : null;
    }
  }

  //#endregion


  //#region Visits Functions


  /**
   * Submit the visit and adds to the DDBB
   */
  addVisit() {

    //console.log(this.registerVisitForm.value.fileSource);

    if (this.registerVisitForm.value.treat) {
      // Visita y/o factura por tratamiento.
      this.registerVisitForm.value.treat.forEach((t: any) => {

        // Registrar visita
        console.log("Creando objeto visita...");
        this.actualVisit = {
          num: this.registerVisitForm.value.numHis,
          dni: this.registerVisitForm.value.dni,
          name: this.registerVisitForm.value.name,
          surname: this.registerVisitForm.value.surnames,
          date: this.registerVisitForm.value.date,
          treat: t.id,
          description: this.registerVisitForm.value.desc || "No hay descripción",
          user_id: this.visitPatientId,
          file: this.registerVisitForm.value.file
        };

        console.log("Buscando tratamiento por ID...");

        this.communicator.getTreatmentByID(t.id).subscribe(
          (result: any) => {
            this.tFound = result;
            console.log("TreatFound-> " + this.tFound) + " / " + result;
          }
        );

        console.log("Creando objeto factura...");

        this.genInvoice = {
          payment: "Tarjeta",
          date: this.registerVisitForm.value.date,
          price: this.tFound.price
        };

        console.log("Enviando objeto visita...");

        this.communicator.registerVisit(this.actualVisit).subscribe(
          (result: any) => {
            console.log("Recibiendo objeto visita...");

            if (result.success) { //success message
              console.log("Visita insertado correctamente");
              console.log(result)
            } else { //error message
              console.log("La visita no se ha podido añadir!");
              console.log(result)
            }
          }
        );

        // Facturación
        if (this.registerVisitForm.value.facturation) {

          console.log("Enviando objeto factura...");

          this.communicator.generateInvoice(this.genInvoice).subscribe(
            (result: any) => {
              console.log("Recibiendo objeto visita...");

              if (result.success) { //success message
                console.log("Factura generada correctamente");
                console.log(result);
              } else { //error message
                console.log("La factura no se ha podido generar!");
                console.log(result);
              }
            }
          );

        } else {
          console.log("Facturación desactivada!");
        }

      });
    }




  }
  //#endregion

}
