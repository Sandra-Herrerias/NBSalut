import { CommunicatorService } from 'src/app/services/communicator.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/services/service-user.service';
declare var window: any;
@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  //Attributes
  dataPatients: any[] = [];
  patientSelected : User = new User();
  filteredPatients: any[] = [];
  nameFilter: String = "";
  surnameFilter: String = "";
  ipp: number;
  cp: number;

  constructor(
    private communicator: CommunicatorService,
    private router: Router,
    private serviceUser: ServiceUserService
  ) {
    this.ipp = 10;
    this.cp = 1;
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  /**
   * Function that sends data to another component via service
   * @param data 
   */
  sendNewData(data: User) {
    this.serviceUser.sendData(data);
  }


  /**
   * Load data patient from the database
   */
  loadPatients() {
    this.communicator.getPatients().subscribe(
      (result: any) => {
        // console.log(result);
        this.dataPatients = result;
        this.filteredPatients = this.dataPatients;
      }
    );
  }

  //////////////////////////////////////////////////////////////DEACTIVE OR DELETE

  /**
   * Function that asks for confirmation before deleting or deactivating the comment
   * @param patientSelected
   */
  confirmDeactivate(patientSelected: any) {
    if (patientSelected.active == 1) {
      if (confirm("¿Está segura de desactivar este paciente?")) {
        let info = {
          id: patientSelected.id,
          active: 0
        }
        this.communicator.deactivateUser(info).subscribe(
          (result: any) => {
            // let res = JSON.parse(JSON.stringify(result));
            if (result.success) { //success message
              alert("Usuario desactivado correctamente");
              this.loadPatients();
            } else {//error message
              alert("El usuario no se ha podido desactivar");
            }
          }
        );
      }
    } else {
      if (confirm("¿Está segura de eliminar definitivamente este paciente?")) {
        let info = {
          id: patientSelected.id
        }
        this.communicator.delete(info).subscribe(
          (result: any) => {
            if (result.success) {
              this.deletePatient(patientSelected);
              alert("Paciente eliminado correctamente");
            } else {
              alert("El paciente no se ha podido eliminar");
            }
          }
        );
      }
    }
  }

  /**
 * This method removes the patient from the list in list patients view.
 * @param patientSelected
 */
  deletePatient(patientSelected: any): void {
    for (let i = 0; i < this.dataPatients.length; i++) {
      if (this.dataPatients[i].id === patientSelected.id) {
        this.dataPatients.splice(i, 1);
        break;
      }
    }
  }

  //////////////////////////////////////////////////////////////UPDATE



  /**
   * This method shows a form to modify the selected patient and loads the patient info.
   */
  showFormModifyPatient(patient: User) {
    this.patientSelected = patient;
    //this.router.navigate(['/editpatient'],{state: {data:patient}});
    this.router.navigate(['/editpatient', { patient: this.patientSelected }]);
    this.sendNewData(this.patientSelected);
  };

  /**
       * filter(): void
       * This method filters the patients array by name and surname
       */
  filter() {
    this.filteredPatients = this.dataPatients.filter(
      p => {
        if (p.first_name.toLocaleLowerCase().indexOf(this.nameFilter.toLocaleLowerCase()) != -1 &&
          p.last_name.toLocaleLowerCase().indexOf(this.surnameFilter.toLocaleLowerCase()) != -1) {
          return true;
        }
        return false;
      });
  }

}
