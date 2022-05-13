import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  clinicalNumLog!: String;

  public userDetails: FormGroup;
  submitted = false;
  emailRegex ='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

  constructor(private formBuilder: FormBuilder, 
    private communicator: CommunicatorService) { 

    this.getNumClinicalLog();

    this.userDetails = this.formBuilder.group({
      numHis: ['',[Validators.required]],
      numSeg: ['',[Validators.required]],
      register_date: ['',[Validators.required]],
      first_name: ['',[Validators.required, Validators.minLength(2)]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email, Validators.pattern(this.emailRegex)]],
      birthdate: ['',[Validators.required]],
      dni: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      address: ['',[Validators.required]],
      city: ['',[Validators.required]],
      postal_code: ['',[Validators.required]],
      previous_pathologies: ['',[Validators.required]]
    }); 
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

  getNumClinicalLog(){

    this.communicator.getUser().subscribe((data: any) => {
      data.forEach((t: any) => {

        this.clinicalNumLog = t.num_clinical_log;
        console.log("CLINICAL NUM: ");
        console.log(this.clinicalNumLog);
        console.log(t);
      })
    })
  }

}
