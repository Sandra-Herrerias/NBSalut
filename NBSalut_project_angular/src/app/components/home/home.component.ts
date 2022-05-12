import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user !: User | null;



  constructor(private communicator: CommunicatorService) { }

  ngOnInit(): void {
   this.user = this.communicator.usuariData();

  }

}
