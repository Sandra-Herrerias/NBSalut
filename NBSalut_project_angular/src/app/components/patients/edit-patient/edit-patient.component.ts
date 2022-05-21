import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { ServicePatientService } from 'src/app/services/service-patient.service';
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  /**
 * Connection between components. 
 * users Table is her mother component.
 * input is used to indicate that this variable (user) comes from abroad
 * (from users Table in this case). 
 */

  @Output() modifiedUser = new EventEmitter<User>();

  @Output() eventShow = new EventEmitter<Boolean>();

  user: User = new User();

  public userDetails: FormGroup;
  submitted = false;
  today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);
  todayFormatRegDate =
    ("0" + new Date().getDate()).slice(-2)
    + "/" + ("0" + (new Date().getMonth() + 1)).slice(-2)
    + "/" + new Date().getFullYear();
  regexEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  regexLettersAndSpaces = "^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$";
  regexNumbersCapLetters = "^[a-zA-Z0-9]{14,}$";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private communicator: CommunicatorService,
    public datepipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private servicePatient: ServicePatientService) {


    //Validations from reactive form
    this.userDetails = this.formBuilder.group({
      id: [''],
      num_clinical_log: ['', [Validators.required]],
      register_date: ['', [Validators.required]],
      center_code: ['', [Validators.required]],
      ss_CIP: ['', [Validators.required, Validators.maxLength(14), Validators.pattern(this.regexNumbersCapLetters)]],
      diabetic: [false],
      active: [false],
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexLettersAndSpaces)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexLettersAndSpaces)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.regexEmail)]],
      birthdate: ['', [Validators.required]],
      dni: ['', [Validators.required, this.createDniValidator()]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      previous_pathologies: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.getData();
    this.userDetails.controls['id'].setValue(this.user.id);
    this.userDetails.controls['num_clinical_log'].setValue(this.user.num_clinical_log);
    this.userDetails.controls['register_date'].setValue(this.user.register_date);
    this.userDetails.controls['center_code'].setValue(this.user.center_code);
    this.userDetails.controls['ss_CIP'].setValue(this.user.ss_CIP);
    this.userDetails.controls['diabetic'].setValue(this.user.diabetic);
    this.userDetails.controls['active'].setValue(this.user.active);
    this.userDetails.controls['first_name'].setValue(this.user.first_name);
    this.userDetails.controls['last_name'].setValue(this.user.last_name);
    this.userDetails.controls['email'].setValue(this.user.email);
    this.userDetails.controls['birthdate'].setValue(this.user.birthdate);
    this.userDetails.controls['dni'].setValue(this.user.dni);
    this.userDetails.controls['phone'].setValue(this.user.phone);
    this.userDetails.controls['address'].setValue(this.user.address);
    this.userDetails.controls['city'].setValue(this.user.city);
    this.userDetails.controls['postal_code'].setValue(this.user.postal_code);
    this.userDetails.controls['previous_pathologies'].setValue(this.user.previous_pathologies);
  }

  getData() {
    this.servicePatient.data.subscribe(response => {
      this.user = response;
    });
  }

  get userDetailsFormControl() {
    return this.userDetails.controls;
  }

  /**
 * Function that validates NIF/NIE
 * @returns 
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


  /**
* This method saves the new info to modify the comments and sends it to the method that actually modifies the comments in the service.
* Also shows the form to collect the new info.
*/
  emitInfoModifyUser(): void {
    this.modifiedUser.emit(this.user);

    let info = {
      "id": this.userDetails.value.id,
      "first_name": this.userDetails.value.first_name,
      "last_name": this.userDetails.value.last_name,
      "password": null,
      "dni": this.userDetails.value.dni,
      "email": this.userDetails.value.email,
      "phone": this.userDetails.value.phone,
      "birthdate": this.userDetails.value.birthdate,
      "city": this.userDetails.value.city,
      "address": this.userDetails.value.address,
      "postal_code": this.userDetails.value.postal_code,
      "active": this.userDetails.value.active,
      "previous_pathologies": this.userDetails.value.previous_pathologies,
      "diabetic": this.userDetails.value.diabetic,
      "ss_CIP": this.userDetails.value.ss_CIP,
      "center_code": this.userDetails.value.center_code,
      "num_clinical_log": this.userDetails.value.num_clinical_log,
      "role": this.user.role,
      "register_date": this.userDetails.value.register_date
    }
    console.log("DATA NEW PATIENT");
    console.log(info);
    console.log(this.user);

    // console.log(info);
    if (this.userDetails) {
      this.communicator.modifyDataUser(info).subscribe(
        (result: any) => {
          // let res = JSON.parse(JSON.stringify(result));
          console.log(result);
          if (result.success) { //success message
            alert("Usuario modificado correctamente");
          } else {//error message
            alert("El usuario no se ha podido modificar");
          }
        }
      );
    } else {//error message
      alert("El comentario no puede estar vacío");
    }


    //Emits father that modify form will be hidden
    this.eventShow.emit(false);
    this.router.navigateByUrl('/listpatient');
  }
}
