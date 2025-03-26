import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  added: boolean = false;
  _added: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.added);
  deleted: boolean = false;
  _deleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.deleted);

  changeBoolean(type: string, value: boolean){
    if(type == 'added'){
      this.added = value;
      this._added.next(this.added);
    }else if(type == 'deleted'){
      this.deleted = value;
      this._deleted.next(this.deleted);
    }
  }
  returnAdded(){
    return this._added.asObservable();
  }
  returnDeleted(){
    return this._deleted.asObservable();
  }
}
