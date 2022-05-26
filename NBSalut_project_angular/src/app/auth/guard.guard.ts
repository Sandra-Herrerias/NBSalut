import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CommunicatorService } from '../services/communicator.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  // user: User = new User();

  constructor(private route: Router, private http: CommunicatorService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.http.usuariData();


    console.log( route.url[0].path )

    if (user) {
      if (user._role == 'specialist'
        && route.url[0].path == 'listworkers'
        || route.url[0].path == 'editworker'
        || route.url[0].path == 'regspecialist') {
        return this.route.navigate(['/login']).then(() => false);
      } else {
        return true;
      }
      // console.log("con sesion")
      // return true;
    }
    console.log("sin sesion")
    return this.route.navigate(['/login']).then(() => false);
  }

}