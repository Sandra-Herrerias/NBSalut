import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommunicatorService } from './services/communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NBSalut';
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  user: any;
  public data?: string;

  constructor(private http: CommunicatorService, private route: Router) {
    this.http.user.subscribe(
      resultat => {
        this.user = resultat;
        // console.log(this.user);
      }
    )
    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.data = this.route.url;
        console.log(this.data);
      }
    });

  }

  logout() {
    this.http.logout();
    this.route.navigate(['/login']);
  }

}
