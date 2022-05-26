import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.css']
})
export class EditTreatmentComponent implements OnInit {

  messageG: string = "";
  messageB: string = "";

  actualTreat: any;
  actualTreatSend: any;

  actualId: number | undefined;;

  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: ActivatedRoute, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.actualTreat = new TreatmentClass();
    this.actualId = Number(this.route.snapshot.paramMap.get("id"));
    if (!isNaN(this.actualId)) {
      this.communicator.getTreatmentByID(this.actualId).subscribe((results: any) => {
        if (results.success) {
          this.actualTreat = Object.assign(new TreatmentClass(), results.treat);
          // console.log(this.actualTreat);
          this.updateTreatmentForm.get('name')?.setValue(this.actualTreat.name);
          this.updateTreatmentForm.get('desc')?.setValue(this.actualTreat.description);
          this.updateTreatmentForm.get('price')?.setValue(this.actualTreat.price);
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

    this.actualTreatSend = {
      id: this.actualTreat.id,
      name: this.updateTreatmentForm.value.name,
      price: this.updateTreatmentForm.value.price,
      desc: this.updateTreatmentForm.value.desc
    }

    this.communicator.modifyTreatment(this.actualTreatSend).subscribe(
      (result: any) => {

        if (result.success) { //success message
          this.toastr.success('Tratamiento modificado correctamente','', {
            enableHtml: true,
          });
          // this.messageG = "Tratamiento modificado correctamente";
          // this.messageB = "";
        } else { //error message
          this.toastr.error('El tratamiento no se ha podido modificar!','', {
            enableHtml: true,
          });
          // this.messageB = "El tratamiento no se ha podido modificar!";
          // this.messageG = "";
        }
      }
    );
  }
}
