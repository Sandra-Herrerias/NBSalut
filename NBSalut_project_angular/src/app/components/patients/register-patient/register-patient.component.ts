import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { DatePipe } from '@angular/common';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  //Attributes
  clinicalNumLog!: String;
  public userDetails: FormGroup;
  submitted = false;
  currentDateTime: string | null;
  textoDeInput!: string | null;
  newClinicalNum!: Number;
  today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);

  regexEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  regexLettersAndSpaces = "^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$";
  /**
   * Constructor
   * @param formBuilder 
   * @param communicator 
   * @param datepipe 
   */
  constructor(private formBuilder: FormBuilder,
    private communicator: CommunicatorService,
    public datepipe: DatePipe) {

    this.getNumClinicalLog();

    //Validations from reactive form
    this.userDetails = this.formBuilder.group({
      numHis: ['', [Validators.required]],
      register_date: ['', [Validators.required]],
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


    //Get current date in order to insert it into the field ("Fecha de registro")
    this.currentDateTime = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
  }


  

  ngOnInit(): void {
  }

  get userDetailsFormControl() {
    return this.userDetails.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userDetails.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.userDetails.value);
    }
  }

  /**
   * Function that gets the new clinical number from the patient
   * that is going to be registered
   */
  getNumClinicalLog() {
    this.communicator.getUser().subscribe((data: any) => {
      data.forEach((t: any, index: any) => {
        this.clinicalNumLog = t.num_clinical_log;
        console.log("CLINICAL NUM: ");
        console.log(this.clinicalNumLog);
        console.log(t);
        console.log(index + 1);
        let maxClinicalNum = Math.max(Number(this.clinicalNumLog));
        this.newClinicalNum = maxClinicalNum + 1;
      })
    })
  }

  createDniValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        var numero
        var letr
        var letra
        var expresion_regular_dni
        var dniValid= false;
        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
       
        if(expresion_regular_dni.test(value) == true){
           numero = value.substr(0,value.length-1);
           letr = value.substr(value.length-1,1);
           numero = numero % 23;
           letra='TRWAGMYFPDXBNJZSQVHLCKET';
           letra=letra.substring(numero,numero+1);
          if (letra!=letr.toUpperCase()) {
             //alert('Dni erroneo, la letra del NIF no se corresponde');
             dniValid= false;
           }else{
             //alert('Dni correcto');
             dniValid= true;
           }
        }else{
           //alert('Dni erroneo, formato no válido');
           dniValid= false;
         }


        return !dniValid ? {correctDni:true}: null;
    }
}

}
