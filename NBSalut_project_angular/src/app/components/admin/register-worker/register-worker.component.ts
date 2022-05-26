import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.component.html',
  styleUrls: ['./register-worker.component.css']
})
export class RegisterWorkerComponent implements OnInit {

  //Attributes
  dataPatient: any;
  public userDetails: FormGroup;
  submitted = false;
  currentDateTime: string | null;
  textoDeInput!: string | null;
  today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);
  todayFormatRegDate =
    ("0" + new Date().getDate()).slice(-2)
    + "/" + ("0" + (new Date().getMonth() + 1)).slice(-2)
    + "/" + new Date().getFullYear();
  regexEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  regexLettersAndSpaces = "^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$";
  regexNumbersCapLetters = "^[a-zA-Z0-9]{14,}$";
  listRoles: String[] = ['admin', 'specialist'];

  constructor(
    private formBuilder: FormBuilder,
    private communicator: CommunicatorService,
    public datepipe: DatePipe) {

    //Validations from reactive form
    this.userDetails = this.formBuilder.group({
      id: [''],
      collegiate_num: ['', [Validators.required]],
      register_date: ['', [Validators.required]],
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
      role: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    //Get current date in order to insert it into the field ("Fecha de registro")
    this.currentDateTime = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit(): void {
  }

  /**
 * Get form data
 */
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
          dniValid = false;
        } else {
          dniValid = true;
        }
      } else {
        dniValid = false;
      }
      return !dniValid ? { correctDni: true } : null;
    }
  }
  /**
     * Function to add the new worker
     */
  addNewWorker() {
    this.submitted = true;

    let info = {
      "id": this.userDetails.value.id,
      "first_name": this.userDetails.value.first_name,
      "last_name": this.userDetails.value.last_name,
      "password": this.userDetails.value.password,
      "dni": this.userDetails.value.dni,
      "email": this.userDetails.value.email,
      "phone": this.userDetails.value.phone,
      "birthdate": this.userDetails.value.birthdate,
      "city": this.userDetails.value.city,
      "address": this.userDetails.value.address,
      "postal_code": this.userDetails.value.postal_code,
      "active": 1,
      "collegiate_num": this.userDetails.value.collegiate_num,
      "role": this.userDetails.value.role,
      "register_date": this.userDetails.value.register_date,
      "created_at": this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS'),
      "updated_at": this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS')
    }

    if (this.userDetails.valid) {
      this.communicator.addWorker(info).subscribe(
        (result: any) => {
          if (result.success) {//success message

            alert("Especialista insertado correctamente");
            //clear form
            this.userDetails.reset();
            //sets register_date
            this.userDetails.patchValue({
              register_date: this.todayFormatRegDate
            });
          } else {//error message
            alert("El especialista no se ha podido añadir "  + result.message);
          }
        }
      );
      console.table(this.userDetails.value);
    } else {//error message
      alert("Los datos del paciente no pueden estar vacíos");
    }
  }
}
