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
    
  }

}
