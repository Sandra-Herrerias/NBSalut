import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.css']
})
export class EditTreatmentComponent implements OnInit {

  actualTreat: any;
  actualTreatSend: any;

  actualId: number | undefined;;

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.actualTreat = new TreatmentClass();
    this.actualId = Number(this.route.snapshot.paramMap.get("id"));
    console.log(this.actualId);
    if (!isNaN(this.actualId)) {
      this.communicator.getTreatmentByID(this.actualId).subscribe((results: any) => {
        if (results.success) {
          this.actualTreat = Object.assign(new TreatmentClass(), results.treat);
          console.log(this.actualTreat);
          this.updateTreatmentForm.get('name')?.setValue(this.actualTreat.name);
          this.updateTreatmentForm.get('desc')?.setValue(this.actualTreat.description);
          this.updateTreatmentForm.get('price')?.setValue(this.actualTreat.price);
        } else {
          console.log("No encontrado!");
        }
      })
    }
  }

  public updateTreatmentForm = this.formBuilder.group({
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

  updateTreatment() {
    console.log("Original: " + this.actualTreat.name);
    console.log("Nuevo: " + this.updateTreatmentForm.value.name);

    this.actualTreatSend = {
      id: this.actualTreat.id,
      name: this.updateTreatmentForm.value.name,
      price: this.updateTreatmentForm.value.price,
      desc: this.updateTreatmentForm.value.desc
    }

    this.communicator.modifyTreatment(this.actualTreatSend).subscribe(
      (result: any) => {
        console.log("Recibiendo objeto tratamiento...");

        if (result.success) { //success message
          console.log("Tratamiento modificado correctamente");
          console.log(result)
        } else { //error message
          console.log("El tratamiento no se ha podido modificar!");
          console.log(result)
        }
      }
    );
  }
}
