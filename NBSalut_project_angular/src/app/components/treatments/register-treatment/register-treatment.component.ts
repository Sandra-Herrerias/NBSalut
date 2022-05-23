import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-register-treatment',
  templateUrl: './register-treatment.component.html',
  styleUrls: ['./register-treatment.component.css']
})
export class RegisterTreatmentComponent implements OnInit {

  actualTreat: any;

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: Router) { }

  ngOnInit(): void {
  }

  public registerTreatmentForm = this.formBuilder.group({
    name: [
      '', [Validators.required]
    ],
    price: [
      '', [Validators.required]
    ],
    desc: [
      ''
    ]

  });

  addTreatment() {
    this.actualTreat = {
      name: this.registerTreatmentForm.value.name,
      desc: this.registerTreatmentForm.value.desc,
      price: this.registerTreatmentForm.value.price
    }

    this.communicator.addTreatment(this.actualTreat).subscribe(
      (result: any) => {
        console.log("Recibiendo de vuelta objeto tratamiento...");

        if (result.success) { //success message
          console.log("Tratamiento insertado correctamente");
          console.log(result);
        } else { //error message
          console.log("El tratamiento no se ha podido añadir!");
          console.log(result);
        }
      }
    );
  }

}
