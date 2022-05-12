import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {


 

  constructor(private http: HttpClient, private route: Router) { }

  login(user: any) {
    
    return this.http.post("http://127.0.0.1:8000/api/login",
    {
      responseType: "json",
      params: { email: user.email, password: user.password }
    }).pipe(
      map(res => {
        console.log(res);
      })
    );
  }

  // Register Visit Functions

  getTreatments() {
    return this.http.get("http://127.0.0.1:8000/getTreatments",
      {
        responseType: "json"
      });
  }
}
