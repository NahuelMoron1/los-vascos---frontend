import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDisplayService {
  displayed: string = 'myAccount';
  _displayed: BehaviorSubject<string> = new BehaviorSubject<string>(this.displayed);
  constructor() { }
  changeDisplay(name: string){
    this.displayed = name;
    this._displayed.next(this.displayed);
  }
  getDisplay(){
    return this._displayed.asObservable();
  }
}
