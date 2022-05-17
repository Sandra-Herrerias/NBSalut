import { CommunicatorService } from 'src/app/services/communicator.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {
  dataPatients: any[] = [];
  userSelected !: User;
  constructor(private communicator: CommunicatorService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  /**
   * Load data patient from the database
   */
  loadPatients() {
    this.communicator.getPatients().subscribe(
      (result: any) => {
        this.dataPatients = result;
      }
    );
  }

  /**
   * Function that asks for confirmation before deleting the comment
   * @param userSelected
   */
  confirmDeactivate(userSelected: any) {
    if (confirm("¿Está segura de desactivar este paciente?")) {

      let info = {
        id: userSelected.id,
        active: 0
      }

      /*
              this.communicator.modifyPatient(info).subscribe((result: any) => {
                if (result.status) {
                  
                }
              });*/
    }
  }


}
