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
  @Input() user!: User;

  @Output() modifiedUser = new EventEmitter<User>();

  @Output() eventShow = new EventEmitter<Boolean>();

  newUser: User = new User();
  public newUserDetails: FormGroup;
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
    this.newUserDetails = this.formBuilder.group({
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

    this.newUserDetails.controls['num_clinical_log'].setValue(this.newUser.num_clinical_log);
    //this.newUserDetails.controls['register_date'].setValue(this.newUser.register_date);
    this.newUserDetails.controls['center_code'].setValue(this.newUser.center_code);
    this.newUserDetails.controls['ss_CIP'].setValue(this.newUser.ss_CIP);
    this.newUserDetails.controls['diabetic'].setValue(this.newUser.diabetic);
    this.newUserDetails.controls['active'].setValue(this.newUser.active);
    this.newUserDetails.controls['first_name'].setValue(this.newUser.first_name);
    this.newUserDetails.controls['last_name'].setValue(this.newUser.last_name);
    this.newUserDetails.controls['email'].setValue(this.newUser.email);
    this.newUserDetails.controls['birthdate'].setValue(this.newUser.birthdate);
    this.newUserDetails.controls['dni'].setValue(this.newUser.dni);
    this.newUserDetails.controls['phone'].setValue(this.newUser.phone);
    this.newUserDetails.controls['address'].setValue(this.newUser.address);
    this.newUserDetails.controls['city'].setValue(this.newUser.city);
    this.newUserDetails.controls['postal_code'].setValue(this.newUser.postal_code);
    this.newUserDetails.controls['previous_pathologies'].setValue(this.newUser.previous_pathologies);
  }

  getData() {
    console.log("getData");
    this.servicePatient.data.subscribe(response => {
      console.log(response);  // you will receive the data from sender component here.
    this.newUser = response;
    });
  }

  get newUserDetailsFormControl() {
    return this.newUserDetails.controls;
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
    this.modifiedUser.emit(this.newUser);

    let info = {
      first_name: this.newUserDetails.get('first_name')?.value,
      last_name: this.newUserDetails.value.last_name,
      dni: this.newUserDetails.value.dni,
      email: this.newUserDetails.value.email,
      phone: this.newUserDetails.value.phone,
      birthdate: this.newUserDetails.value.birthdate,
      city: this.newUserDetails.value.city,
      address: this.newUserDetails.value.address,
      postal_code: this.newUserDetails.value.postal_code,
      active: this.newUserDetails.value.active,
      previous_pathologies: this.newUserDetails.value.previous_pathologies,
      diabetic: this.newUserDetails.value.diabetic,
      ss_CIP: this.newUserDetails.value.ss_CIP,
      center_code: this.newUserDetails.value.center_code,
      num_clinical_log: this.newUserDetails.value.num_clinical_log,
      role: this.newUserDetails.value.role,
      created_at: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS'),
      updated_at: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS')
    }
    console.log("DATA NEW PATIENT");
    console.log(info);
    console.log(this.newUser);
    console.log(this.newUserDetails);
    // console.log(info);
    if (this.newUserDetails) {
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
