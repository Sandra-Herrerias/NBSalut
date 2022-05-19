import { CommunicatorService } from 'src/app/services/communicator.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ServicePatientService } from 'src/app/services/service-patient.service';
@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {
  dataPatients: any[] = [];
  patientSelected !: User;
  constructor(
    private communicator: CommunicatorService,
    private router: Router,
    private servicePatient: ServicePatientService
  ) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  sendNewData(data: User) {
    console.log("sendNewData");
    this.servicePatient.sendData(data);
  }
  

  /**
   * Load data patient from the database
   */
  loadPatients() {
    this.communicator.getPatients().subscribe(
      (result: any) => {
        console.log(result);
        this.dataPatients = result;
      }
    );
  }

  //////////////////////////////////////////////////////////////DEACTIVE OR DELETE

  /**
   * Function that asks for confirmation before deleting the comment
   * @param patientSelected
   */
  confirmDeactivate(patientSelected: any) {
    console.log("PATIENT SELECTED");
    console.log(patientSelected);
    if (patientSelected.active == 1) {
      if (confirm("¿Está segura de desactivar este paciente?")) {
        let info = {
          id: patientSelected.id,
          active: patientSelected.active
        }
        console.log(patientSelected.active);
        this.communicator.modifyDataUser(info).subscribe(
          (result: any) => {
            // let res = JSON.parse(JSON.stringify(result));
            console.log(result);
            if (result.success) { //success message
              alert("Usuario modificado correctamente");
            } else {//error message
              alert("El usuario no se ha podido modificar");
            }
          }
        );
      }
    } else {
      if (confirm("¿Está segura de eliminar definitivamente este paciente?")) {
        let info = {
          id: patientSelected.id
        }
        console.log(patientSelected.id);
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
 * This method removes the patient from the list, asking info to the method from the service that removes users.
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
    console.log(patient);
    this.patientSelected = patient;
    //this.router.navigate(['/editpatient'],{state: {data:patient}});
    this.router.navigate(['/editpatient',{patient:this.patientSelected }]);
    this.sendNewData(this.patientSelected);
  };

  /**
* This method sends the user with the new information to the method that modifies the user in the service.
*/
  sendInfoToModifyUser($e: any): void {
    this.communicator.modifyDataUser($e).subscribe((result: any) => {
      if (result.status) {
        // this.showFormModify = false;
      }
    });
  }

}
