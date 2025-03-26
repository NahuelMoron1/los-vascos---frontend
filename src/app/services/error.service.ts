import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}
  public static handleError(err: any) {
    if (err.status === 404) {
      console.warn('404 Not found');
      return false; // Puedes retornar un valor por defecto
    } else {
      throw err;
    }
  }
}
