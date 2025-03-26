import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  progressNumber: number = 0;
  _progressNumber: BehaviorSubject<number> = new BehaviorSubject<number>(this.progressNumber);
  constructor() { }

  updateNumber(numberAux: number){
    this.progressNumber = numberAux;
    this._progressNumber.next(this.progressNumber);
    return this._progressNumber.asObservable();
  }
  returnNumber(){
    return this._progressNumber.asObservable();
  }
}
