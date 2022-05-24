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

  messageG: string = "";
  messageB: string = "";

  listTreatments: TreatmentClass[] = [];
  filteredListTreatments: TreatmentClass[] = [];
  treatmentSelected !: TreatmentClass;

  // Pagination
  ipp: number;
  cp: number;

  // Filters
  nameFilter: string = "";
  inputSearch: string = '';
  status: string = "";

  // Management
  tFound: any;
  stsTreat: any;

  // Forms
  public checkStatus = this.formBuilder.group({
    status: [
      ''
    ]
  })


  constructor(private formBuilder: FormBuilder, private communicator: CommunicatorService, private route: Router) {
    this.ipp = 10;
    this.cp = 1;
  }

  ngOnInit(): void {
    this.loadTreatments();
    //console.log(this.listTreatments);
  }



  loadTreatments() {
    this.communicator.getTreatments().subscribe((data: any) => {
      this.listTreatments = [];
      data.forEach((t: any) => {
        this.listTreatments.push(new TreatmentClass(t.id, t.name, t.price, t.description, t.active));
      })
      this.filteredListTreatments = this.listTreatments;
    })
  }

  /**
   * search(): void
   * This method searches in the array by the fields below
   */
  search(): void {
    if (!this.inputSearch) {
      this.ngOnInit();
    } else {
      this.filteredListTreatments = this.listTreatments.filter(t => {
        return t.name.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
      })
      this.cp = 1;
    }
  }

  changeStatus() {
    if (this.status == "all") {
      this.filteredListTreatments = this.listTreatments.filter(t => {
        return t.active == true || t.active == false
      })
    } else if (this.status == "active") {
      this.filteredListTreatments = this.listTreatments.filter(t => {
        return t.active == true
      })
    } else if (this.status == "inactive") {
      this.filteredListTreatments = this.listTreatments.filter(t => {
        return t.active == false
      })
    }
  }

  /**
   * This method deletes a treatment from the DDBB
   * @param treat the treatment to delete
   */
  statusTreatment(treat: TreatmentClass) {

    this.stsTreat = {
      id: treat.id,
      active: treat.active
    }

    this.communicator.statusTreatment(this.stsTreat).subscribe(
      (result: any) => {
        this.ngOnInit();
        if (result.success) {
          //console.log(result)
          this.messageG = "Estado modificado correctamente";
          this.messageB = "";
        } else {
          //console.log(result)
          this.messageB = "El estado no se ha podido modificar!";
          this.messageG = "";
        }
      }
    );

  }
}
