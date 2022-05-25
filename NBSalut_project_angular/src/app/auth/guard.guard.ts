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

    if (user) {
      // if (user.role == 'specialist'
      //   && route.component == '/listworkers'
      //   || route.component == '/editworker'
      //   || route.component == '/regspecialist') {
      //   return false;
      // } else {
      //   return true;
      // }
      console.log("con sesion")
      return true;
    }
    console.log("sin sesion")
    return false;
  }

}
