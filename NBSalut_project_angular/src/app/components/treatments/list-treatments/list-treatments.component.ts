import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TreatmentClass } from 'src/app/models/treatment-class.model';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-list-treatments',
  templateUrl: './list-treatments.component.html',
  styleUrls: ['./list-treatments.component.css']
})
export class ListTreatmentsComponent implements OnInit {

  listTreatments: TreatmentClass[] = [];
  filteredListTreatments: TreatmentClass[] = [];
  treatmentSelected !: TreatmentClass;

  // Pagination
  ipp: number;
  cp: number;

  // Filters
  nameFilter: string = "";



  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: Router) {
    this.ipp = 10;
    this.cp = 1;
  }

  ngOnInit(): void {
    this.loadTreatments();
    console.log(this.listTreatments);
  }



  loadTreatments() {
    this.communicator.getTreatments().subscribe((data: any) => {
      data.forEach((t: any) => {
        this.listTreatments.push(new TreatmentClass(t.id, t.name, t.price, t.description));
        this.filteredListTreatments = this.listTreatments;
      })
    })
  }

  /**
       * filter(): void
       * This method filters the patients array by name and surname 
       */
   filter() {
    this.filteredListTreatments = this.listTreatments.filter(
      p => {
      if (p.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) != -1) {
        return true;
      }
      return false;
    });
  }
}
