import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-listworkers',
  templateUrl: './listworkers.component.html',
  styleUrls: ['./listworkers.component.css']
})
export class ListworkersComponent implements OnInit {
  dataWorkers: any[] = [];
  workerSelected !: User;
  ipp: number;
  cp: number;
  inputSearch: string = '';
  constructor(
    private communicator: CommunicatorService,
    private router: Router,
    private serviceUser: ServiceUserService
  ) {
    this.ipp = 10;
    this.cp = 1;
  }

  ngOnInit(): void {
    this.loadWorkers();
    console.log(this.loadWorkers());
  }

  sendNewData(data: User) {
    this.serviceUser.sendData(data);
  }

  /**
 * Load data patient from the database
 */
  loadWorkers() {
    this.communicator.getWorkers().subscribe(
      (result: any) => {
        this.dataWorkers = result;
      }
    );
  }



  //////////////////////////////////////////////////////////////DEACTIVE OR DELETE

  /**
   * Function that asks for confirmation before deleting the comment
   * @param workerSelected
   */
  confirmDeactivate(workerSelected: any) {
    if (workerSelected.active == 1) {
      if (confirm("¿Está segura de desactivar este especialista?")) {
        let info = {
          id: workerSelected.id,
          active: 0
        }
        this.communicator.deactivateUser(info).subscribe(
          (result: any) => {
            // let res = JSON.parse(JSON.stringify(result));
            if (result.success) { //success message
              alert("Usuario desactivado correctamente");
              this.loadWorkers();
            } else {//error message
              alert("El usuario no se ha podido desactivar");
            }
          }
        );
      }
    } else {
      if (confirm("¿Está segura de eliminar definitivamente este especialista?")) {
        let info = {
          id: workerSelected.id
        }
        this.communicator.delete(info).subscribe(
          (result: any) => {
            if (result.success) {
              this.deleteWorker(workerSelected);
              alert("Especialista eliminado correctamente");
            } else {
              alert("El especialista no se ha podido eliminar");
            }
          }
        );
      }
    }
  }

  /**
 * This method removes the worker from the list, asking info to the method from the service that removes users.
 * @param workerSelected
 */
  deleteWorker(workerSelected: any): void {
    for (let i = 0; i < this.dataWorkers.length; i++) {
      if (this.dataWorkers[i].id === workerSelected.id) {
        this.dataWorkers.splice(i, 1);
        break;
      }
    }
  }

    //////////////////////////////////////////////////////////////UPDATE



  /**
   * This method shows a form to modify the selected worker and loads the worker info.
   */
   showFormModifyWorker(worker: User) {
    this.workerSelected = worker;
    this.router.navigate(['/editworker', { worker: this.workerSelected }]);
    this.sendNewData(this.workerSelected);
  };


    /**
   *
   */
     search(): void {
      if (!this.inputSearch) {
        this.ngOnInit();
      } else {
        this.dataWorkers = this.dataWorkers.filter(res => {
          return res.first_name.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
            || res.last_name.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase())
            || res.dni.toLocaleLowerCase().includes(this.inputSearch.toLocaleLowerCase());
        })
        this.cp=1;
      }
    }
}
