import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public realValue = '';
  public observableValue = '';

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
}
