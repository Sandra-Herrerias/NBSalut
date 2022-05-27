import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})


export class CommunicatorService {

  //https://apps.proven.cat/~DAW212203/NBSalut_project/public
  //http://127.0.0.1:8000

  getLastsInvoicesBySpecialist(id: any) {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getLastsInvoicesBySpecialist",
      {
        params: { specialist_id: id },
        responseType: "json"
      });
  }
  getLastsVistsBySpecialist(id: any) {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getLastsVistsBySpecialist",
      {
        params: { id: id },
        responseType: "json"
      });
  }
  getLastsPatients() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getLastsPatients",
      {
        responseType: "json"
      });
  }
  getTotalPatients() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getTotalPatients",
      {
        responseType: "json"
      });
  }
  getTotalVisitsBySpecialist(id: any) {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getTotalVisitsBySpecialist",
      {
        params: { specialist_id: id },
        responseType: "json"
      });
  }

  getTotalInvoicesBySpecialist(id: any) {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getTotalInvoicesBySpecialist",
      {
        params: { specialist_id: id },
        responseType: "json"
      });
  }

  getInvoice(data: any) {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getInvoice",
      {
        params: { invoice_id: data.invoice_id },
        responseType: "json"
      });
  }


  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));//estat inicial del BehaviorSubject
    this.user = this.userSubject.asObservable();////part public del Behabiour Subject que s'hi actualitza
  }

  //#region Users Functions

  sentInvoicesChecked(invoices: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/sentInvoicesChecked", { "invoices": invoices },
      {
        responseType: "json"
      });
  }

  /**
   *
   * @param user the user to validate the login
   * @returns the user validated & a response with a success variable.
   */
  login(user: any) {

    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/login",
      { email: user.email, password: user.password },
      {
        responseType: "json",
      }).pipe(
        map((res: any) => {
          if (res.success) {
            // console.log(res);
            // const user: User = new User(res.user.id,
            //   res.user.first_name, res.user.last_name,
            //   res.user.password, "", res.user.email,"","","","","", "","","","","",);
            const user: User = Object.assign(new User(), res.user);
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


  /**
   * Retrieve all users (patients and specialists) from the DDBB.
   * @returns a list of all the users.
   */
  getUsers() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getUsers",
      {
        responseType: "json"
      });
  }

  usuariData(): User | any {
    // return this.usuariSubject;
    return this.userSubject.value;
  }

  //#endregion


  //#region Treatments Functions


  /**
   *
   * @returns a list of treatments from the DDBB
   */
  getTreatments() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getTreatments",
      {
        responseType: "json"
      });
  }

  getTreatmentByID(id: number) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getTreatment",
      id,
      {
        responseType: "json"
      });
  }

  addTreatment(treat: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/addTreatment",
      treat,
      {
        responseType: "json"
      });
  }

  statusTreatment(treat: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/statusTreatment",
      treat,
      {
        responseType: "json"
      });
  }

  modifyTreatment(treat: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/modTreatment",
      treat,
      {
        responseType: "json"
      });
  }

  //#endregion


  //#region Invoices Functions

  /**
    *
    * @returns a list of invoices from the DDBB
    */
  getInvoices(data: any) {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getInvoices",
      {
        params: { startDate: data.startDate, endDate: data.endDate, sent: data.sent, specialist_id: data.specialist_id },
        responseType: "json"
      });
  }


  /**
   * Generates invoice
   * @param data
   * @returns
   */
  generateInvoice(data: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/generateInvoice",
      data,
      {
        responseType: "json"
      });
  }
  /**
   * Gets total invoices
   * @returns total invoices
   */
  getTotalInvoices(): Observable<any> {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getTotalInvoices",
      {
        responseType: "json"
      });
  }

  //#endregion


  //#region Patients Functions


  /**
   *
   * @param user the user to check if exists in the DDBB with the DNI
   * @returns the patient validated & a response with a success variable.
   */
  checkPatientDni(user: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/checkPatientDni",
      { dni: user.dni },
      {
        responseType: "json"
      });
  }

  /**
   *
   * @param user the user to check if exists in the DDBB with the full name
   * @returns the patient validated & a response with a success variable.
   */
  checkPatientName(user: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/checkPatientName",
      {
        name: user.name,
        surname: user.surname
      },
      {
        responseType: "json"
      });
  }

  /**
   * Method to add a new patient in the DDBB
   * @param info data to add in the DDBB
   * @returns patient data
   */
  addPatient(info: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/addPatient",
      info,
      { responseType: "json" });

  }

  /**
 * Retrieve all patients from the DDBB.
 * @returns a list of all the users.
 */
  getPatients() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getPatients",
      {
        responseType: "json"
      });
  }

  /**
* Retrieve all workers from the DDBB.
* @returns a list of all the users.
*/
  getWorkers() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getWorkers",
      {
        responseType: "json"
      });
  }

  /**
* Method to adds a new worker in the DDBB
* @param info data to add in the DDBB
* @returns worker data
*/
  addWorker(info: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/addWorker",
      info,
      { responseType: "json" });

  }

  /**
   * Retrieves the maximum number from the clinical log numbers that are stored in the database.
   * @returns max clinical number from the database
   */
  getMaxClinicalLog() {
    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getMaxClinicalLog",
      {
        responseType: "json"
      });
  }

  /**
 * This method modifies the selected user with the new info.
 * @param info
 */
  modifyDataUser(info: Object) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/updateUser",
      info,
      { responseType: "json" });
  }

  /**
 * This method deactivates the selected user.
 * @param info
 */
  deactivateUser(info: Object) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/deactivateUser",
      info,
      { responseType: "json" });
  }


  /**
* Service DELETE. Function that deletes a user from the database.
* @param info
* @returns response
*/
  delete(info: any) {
    // console.log(info);
    return this.http.delete("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/deleteUser",
      {
        responseType: "json",
        body: info

      });
  }

  //#endregion


  //#region Visit Functions


  /**
  *Function that gets a patient's visit
  * @returns a list of visits of the patient given from the DDBB
  */
  getVisitsPatient(patient: any) {

    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getVisitsPatient",
      {
        id: patient.id
      },
      {
        responseType: "json"
      });
  }

  /**
  *Function that gets all visits from the database
  * @returns a list of visits from the DDBB
  */
  getVisits() {

    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getVisits",
      {
        responseType: "json"
      });
  }

  /**
   * Register visit in the DDBB
   * @returns the visit inserted & a response with a success variable.
   */
  registerVisit(visit: any) {
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/insertVisit",
      visit,
      {
        responseType: "json"
      });
  }



  /**
* Function that enables the retrievement of specialist name and treatment name associated
* with the visit.
* @returns a list of visits from the DDBB
*/
  getVisitsList() {

    return this.http.get("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/getVisitsList",
      {
        responseType: "json"
      });
  }

  /**
* Service DELETE. Function that deletes a visit from de database
* @param info
* @returns response
*/
  delVisit(info: any) {
    return this.http.delete("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/delVisit",
      {
        responseType: "json",
        body: info
      });
  }

  uploadFile(file: File, visit_id: number) {
    const formData: FormData = new FormData();

    formData.append('image', file);

    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/upload", formData,
      {
        responseType: "json"
      });
  }

  listFiles(id: number) {
    // console.log("id del paciente: " + id)
    return this.http.post("https://apps.proven.cat/~DAW212203/NBSalut_project/public/api/listFiles", id,
      {
        responseType: "json"
      });
  }

  //#endregion

}
