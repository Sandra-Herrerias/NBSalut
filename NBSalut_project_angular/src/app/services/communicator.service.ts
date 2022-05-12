import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private http: HttpClient) { }

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
}
