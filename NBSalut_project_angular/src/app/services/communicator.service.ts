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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Users Functions

  /**
   * 
   * @param user the user to validate the login
   * @returns the user validated & a response with a success variable.
   */
  login(user: any) {

    return this.http.post("http://127.0.0.1:8000/api/login",
      { email: user.email, password: user.password },
      {
        responseType: "json",
      }).pipe(
        map((res: any) => {
          // console.log(res);
          // return res;
          if (res.success) {
            // console.log(res);
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

  /**
   * Logout the actual sesion
   */
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(JSON.parse(null!));
  }

  getUser() {
    return this.http.get("http://127.0.0.1:8000/api/getUser",
      {
        responseType: "json"
      });
  }

  usuariData(): User | any {
    // return this.usuariSubject;
    return this.userSubject.value;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // Treatment Functions

  /**
   * 
   * @returns a list of treatments from the DDBB
   */
  getTreatments() {
    return this.http.get("http://127.0.0.1:8000/api/getTreatments",
      {
        responseType: "json"
      });
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // Invoices Functions
  getInvoices() {
    return this.http.get("http://127.0.0.1:8000/api/getInvoices",
      {
        responseType: "json"
      });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Patients Functions

  /**
   * 
   * @param user the user to check if exists in the DDBB with the DNI
   * @returns the patient validated & a response with a success variable.
   */
  checkPatientDni(user: any) {
    return this.http.post("http://127.0.0.1:8000/api/checkPatientDni",
      { dni: user.dni },
      {
        responseType: "json"
      }).pipe(
        map((res: any) => {
          if (res.success) {
            const user: User = new User(res.user.id,
              res.user.first_name, res.user.last_name,
              res.user.email, res.user.password, res.user.role);
            this.userSubject.next(user);
          }
          return res;
        }));

  }

  /**
   * 
   * @param user the user to check if exists in the DDBB with the full name
   * @returns the patient validated & a response with a success variable.
   */
  checkPatientName(user: any) {
    return this.http.post("http://127.0.0.1:8000/api/checkPatientName",
      {
        name: user.name,
        surname: user.surname
      },
      {
        responseType: "json"
      }).pipe(
        map((res: any) => {
          if (res.success) {
            const user: User = new User(res.user.id,
              res.user.first_name, res.user.last_name,
              res.user.email, res.user.password, res.user.role);
            this.userSubject.next(user);
          }
          return res;
        }));

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
