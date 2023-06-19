import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { 

  }
  getuser(obj):Observable<any>{
    this.User2.next(obj);
    return this.User2;
  }
  User2= new BehaviorSubject<any>([]);
  data= new BehaviorSubject<any>([]);
}