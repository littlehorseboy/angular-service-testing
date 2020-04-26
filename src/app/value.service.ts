import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  public getValue(): string {
    return 'real value';
  }

  public getObservableValue(): Observable<string> {
    return new Observable((subsriber: Subscriber<string>): void => {
      setTimeout((): void => {
        subsriber.next('observable value');
        subsriber.complete();
      }, 1000);
    });
  }

  public getPromiseValue(): Promise<string> {
    return new Promise((resolve): void => {
      setTimeout((): void => {
        resolve('promise value');
      }, 1000);
    });
  }
}
