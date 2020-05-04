import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { MasterService } from './master.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
});
