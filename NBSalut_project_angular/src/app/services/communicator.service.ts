import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));//estat inicial del BehaviorSubject
    this.user = this.userSubject.asObservable();////part public del Behabiour Subject que s'hi actualitza
  }

  login(user: any) {

    return this.http.post("http://127.0.0.1:8000/api/login",
      { email: user.email, password: user.password },
      {
        responseType: "json",
      }).pipe(
        map((res: any) => {
          if (res.success) {
            const user: User = new User(res.user.id,
              res.user.first_name, res.user.last_name,
              res.user.email, res.user.password, res.user.role);
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return res;
        })
      );
  }


  public usuariData(): User | any {
    return this.userSubject.value;
  }


  // Treatments Functions

  getTreatments() {
    return this.http.get("http://127.0.0.1:8000/api/getTreatments",
      {
        responseType: "json"
      });
  }

   // Invoices Functions
   getInvoices() {
    return this.http.get("http://127.0.0.1:8000/api/getInvoices",
    {
      responseType: "json"
    });
   }

}
