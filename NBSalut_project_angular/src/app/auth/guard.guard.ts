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

    // if (user && route.url[0].path == 'login') {
    //   console.log("tienes sesion volviendo a home")
    //   return this.route.navigate(['/home']).then(() => true);
    // }
    // console.log(route.url[0].path)
    if (user) {
      if (route.url[0].path == 'listworkers'
        || route.url[0].path == 'editworker'
        || route.url[0].path == 'regspecialist') {
        if (user._role == 'specialist') {
          return this.route.navigate(['/home']).then(() => false);
        }
      }
      return true;
    }
    return this.route.navigate(['/login']).then(() => false);
  }

}
