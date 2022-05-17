import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

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
    public datepipe: DatePipe) {

      
    //Validations from reactive form
    this.userDetails = this.formBuilder.group({
      num_clinical_log: ['', [Validators.required]],
      register_date: ['', [Validators.required]],
      center_code: ['', [Validators.required]],
      ss_CIP: ['', [Validators.required, Validators.maxLength(14), Validators.pattern(this.regexNumbersCapLetters)]],
      diabetic: [false],
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

    modifyPatient() {


      this.submitted = true;
  
      let info = {
        first_name: this.userDetails.value.first_name,
        last_name: this.userDetails.value.last_name,
        dni: this.userDetails.value.dni,
        email: this.userDetails.value.email,
        phone: this.userDetails.value.phone,
        birthdate:  this.userDetails.value.birthdate,
        city: this.userDetails.value.city,
        address: this.userDetails.value.address,
        postal_code: this.userDetails.value.postal_code,
        active: this.userDetails.value.active,
        previous_pathologies: this.userDetails.value.previous_pathologies,
        diabetic: this.userDetails.value.diabetic,
        ss_CIP: this.userDetails.value.ss_CIP,
        center_code: this.userDetails.value.center_code,
        num_clinical_log: this.userDetails.value.num_clinical_log,
        role: this.userDetails.value.role,  
        created_at: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS'),
        updated_at: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS')
      }

      this.communicator.modifyDataPatient(info).subscribe((result: any) => {
        if (result.status) {
          //
        }
      });


      this.router.navigateByUrl('/listpatient');
    };
}
