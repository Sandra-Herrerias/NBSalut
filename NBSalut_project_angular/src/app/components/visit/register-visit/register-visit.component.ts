import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  listVisits: any[] = [];
  actualVisit: any;

  genInvoice: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  fileInfos?: Observable<any>;

  patientExist: boolean;
  visitPatient: any;
  visitPatientId: number;

  fileBlob: File | null = null;

  message: string | undefined;

  //user: User = new User();

  //#endregion


  //#region Formbuilder Forms


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
    id: [
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
  user: any;

  //#endregion


  //#region Initialize Section


  constructor(private formBuilder: FormBuilder,
    private communicator: CommunicatorService,
    private route: Router,
    private serviceUser: ServiceUserService,
    private serviceUpload: FileUploadService) {
    this.patientExist = false;
    this.visitPatientId = -1;
    this.communicator.user.subscribe(
      resultat => {
        this.user = Object.assign(new User(), resultat);
        // console.log(this.user.id);
      }
    )
  }

  ngOnInit(): void {
    this.fileInfos = this.serviceUpload.getFiles();

    this.getData();

    //if (this.visitPatient != null) {
    /*this.registerVisitForm.get('name')?.setValue(this.visitPatient.first_name);
    this.registerVisitForm.get('surnames')?.setValue(this.visitPatient.last_name);
    this.registerVisitForm.get('id')?.setValue(this.visitPatient.id);
    this.registerVisitForm.get('dni')?.setValue(this.visitPatient.dni);
    */
    //this.checkPatientDni();
    //}
    this.loadValidTreatments();
    this.loadTreatmentsSelect();
    //console.log(this.listTreatments);
    //console.log(this.listVisits);
  }

  //#endregion


  //#region Loading Functions


  /**
   * Get the patients given visit list
   * @param patient The patient to get his visits
   * @returns a list of visits
   */
  loadVisits(patient: any) {
    this.communicator.getVisitsPatient(patient).subscribe(
      (result: any) => {
        this.listVisits = result;
      }
    );
  }

  /**
   * Load treatments from the DDBB & filter the activated ones.
   */
  loadValidTreatments() {
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

  getData() {
    this.serviceUser.data.subscribe(response => {
      var visitPatient = response;
      console.log(visitPatient);
      console.log(response);
      if (visitPatient.id != null) {
        this.checkTypeForm.value.value = "dni";
        this.validatePatientFormDni.value.dni = visitPatient.dni;
        this.checkPatientDni();
        //this.patientExist = true;
      }
    });
  }

  //#endregion


  //#region Testing


  // Functions to test the multiselect treatment
  onItemSelect() {
    //console.log(this.registerVisitForm.value.treat);
  }
  onSelectAll() {
    //console.log(this.registerVisitForm.value.treat);
  }

  // Function to test the checkbox
  checked() {
    //console.log(this.registerVisitForm.value.facturation);
  }

  //#endregion


  //#region Files Functions

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.serviceUpload.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.serviceUpload.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }


  //#endregion


  //#region Checking Patient Functions


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
        this.registerVisitForm.get('id')?.setValue(res.user.id);
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
        this.registerVisitForm.get('id')?.setValue(res.user.id);
        this.registerVisitForm.get('dni')?.setValue(res.user.dni);

        this.loadVisits(res.user);
        //console.log(this.listVisits);

      } else {
        this.route.navigate(['/regpatient']);
      }
    })
  }

  //#endregion


  //#region Validations

  /**
   * Validates the DNI format of a DNi given
   * @returns true if the DNi its valid, false otherwise
   */
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

    

    if (this.registerVisitForm.value.treat) {
      this.actualVisit = {
        dni: this.registerVisitForm.value.dni,
        name: this.registerVisitForm.value.name,
        surname: this.registerVisitForm.value.surnames,
        date: this.registerVisitForm.value.date,
        treat: this.registerVisitForm.value.treat,
        description: this.registerVisitForm.value.desc || "No hay descripción",
        user_id: this.visitPatientId,
        facturate: this.registerVisitForm.value.facturation,
        pay_type: "tarjeta",
        specialist_id: this.user.id
      };
    

    //console.log(formData);

      this.communicator.registerVisit(this.actualVisit).subscribe(
        (result: any) => {
          //console.log("Recibiendo objeto visita...");

          if (result.success) { //success message
            console.log("Visita insertado correctamente");
            this.upload();
            console.log(result)
          } else { //error message
            console.log("La visita no se ha podido añadir!");
            console.log(result)
          }
        }
      );
    }
  }



  //#endregion

}
