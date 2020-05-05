import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;
  let valueServiceStub: Partial<ValueService>; // 型別就算不加 Partial 也可以的

  beforeEach(() => {
    valueServiceStub = new ValueService();

    spyOn(valueServiceStub, 'getPromiseValue').and.returnValue(
      new Promise((resolve) => {
        resolve('promise value stub');
      }),
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: ValueService, useValue: valueServiceStub },
      ],
    });
    service = TestBed.inject(MasterService);
  });

  it('setValue 後 this.value 是否有正常得到值', () => {
    service.setValue();
    expect(service.realValue).toBe('real value');
  });

  it('setObservableValue 後 this.observableValue 是否有正常得到值', fakeAsync(() => {
    service.setObservableValue();
    tick(1000);
    expect(service.observableValue).toBe('observable value');
  }));

  it('setObservableValue 後 this.observableValue 是否有正常得到值', () => {
    const valueServiceSpy =
      jasmine.createSpyObj('ValueService', ['getObservableValue']);

    const stubValue = 'stub value';
    valueServiceSpy.getObservableValue.and.returnValue(of(stubValue));

    const masterService = new MasterService(valueServiceSpy);

    masterService.setObservableValue();

    expect(masterService.observableValue)
      .toBe('stub value');
    expect(valueServiceSpy.getObservableValue.calls.count())
      .toBe(1, 'spy method was called once');

    valueServiceSpy.getObservableValue.calls.mostRecent().returnValue
      .subscribe(
        (value) => {
          expect(value).toBe(stubValue);
        },
      );
  });

  it('setPromiseValue 後 this.promiseValue 是否有正常得到值', fakeAsync(() => {
    service.setPromiseValue();
    tick();

    expect(service.promiseValue).toBe('promise value stub');
    expect(valueServiceStub.getPromiseValue).toHaveBeenCalledTimes(1);
  }));
});
