import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-edit-workers',
  templateUrl: './edit-workers.component.html',
  styleUrls: ['./edit-workers.component.css']
})
export class EditWorkersComponent implements OnInit {

  /**
* Connection between components.
* users Table is her mother component.
* input is used to indicate that this variable (user) comes from abroad
* (from users Table in this case).
*/
  @Output() modifiedUser = new EventEmitter<User>();
  @Output() eventShow = new EventEmitter<Boolean>();

  //Attributes
  public userDetails: FormGroup;
  user: User = new User();
  submitted = false;
  today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);
  regexEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  regexLettersAndSpaces = "^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$";
  regexNumbersCapLetters = "^[a-zA-Z0-9]{14,}$";
  listRoles: String[] = ['admin', 'specialist'];

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private ServiceUser: ServiceUserService,
    private communicator: CommunicatorService,
    private router: Router, 
    public datepipe: DatePipe
  ) {
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
      password: ['']
    });
  }

  ngOnInit(): void {
    this.getData();
    //Set form values
    this.userDetails.controls['id'].setValue(this.user.id);
    this.userDetails.controls['collegiate_num'].setValue(this.user.collegiate_num);
    this.userDetails.controls['register_date'].setValue(this.datepipe.transform(this.user.register_date, 'yyyy-MM-dd'));
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
    this.userDetails.controls['role'].setValue(this.user.role);
    this.userDetails.controls['password'].setValue(this.user.password);
  }

  /**
   * Function that gets user data
   */
  getData() {
    this.ServiceUser.data.subscribe(response => {
      this.user = response;
    });
  }

  /**
   * Function that gets data from form
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
* This method saves the new info to modify the users and sends it to the method that actually modifies the users in the service.
* Also shows the form to collect the new info.
*/
  emitInfoModifyUser(): void {
    this.modifiedUser.emit(this.user);

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
      "active": this.userDetails.value.active,
      "collegiate_num": this.userDetails.value.collegiate_num,
      "role": this.userDetails.value.role,
      "register_date": this.userDetails.value.register_date
    }

    if (this.userDetails) {
      this.communicator.modifyDataUser(info).subscribe(
        (result: any) => {
          if (result.success) { //success message
            alert("Usuario modificado correctamente");
            //Emits father that modify form will be hidden
            this.eventShow.emit(false);
            this.router.navigateByUrl('/listworkers');
          } else {//error message
            alert("El usuario no se ha podido modificar");
          }
        }
      );
    } else {//error message
      alert("El comentario no puede estar vacío");
    }
  }
}
