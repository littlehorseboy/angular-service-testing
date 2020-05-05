import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public realValue = '';
  public observableValue = '';
  public promiseValue = '';

  constructor(
    private valueService: ValueService,
  ) { }

  public setValue() {
    this.realValue = this.valueService.getValue();
  }

  public setObservableValue(): void {
    this.valueService.getObservableValue()
      .subscribe(
        (value) => this.observableValue = value,
      );
  }

  public setPromiseValue(): void {
    this.valueService.getPromiseValue()
      .then((value) => {
        this.promiseValue = value;
      });
  }
}
