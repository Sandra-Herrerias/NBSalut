import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private dataSource: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  data: Observable<User> = this.dataSource.asObservable();

  constructor() { }
/**
 * sendData function to share data between components
 * @param data
 */
  sendData(data: User) {
    this.dataSource.next(data);
  }
}

