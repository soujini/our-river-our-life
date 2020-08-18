import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {Spinner} from '../models/spinner';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public spinnerSubject = new BehaviorSubject<boolean>(false);
  spinner = this.spinnerSubject.asObservable();

  constructor() { }

  setSpinner(obj:any){
    this.spinnerSubject.next(obj);
  }

  getSpinner() : Observable<any> {
    return this.spinnerSubject.asObservable();
  }
}

