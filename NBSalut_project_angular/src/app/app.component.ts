import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicatorService } from './services/communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NBSalut';

  user:any;

  constructor(private communicator : CommunicatorService, private route : Router){
    this.communicator.user.subscribe(
      resultat =>{
        this.user = resultat;
        console.log('cambio el objeto '+ this.user);
      }
    )
  }


  logout(){
    this.communicator.logout();
    this.route.navigate(['/login']);
  }

}
