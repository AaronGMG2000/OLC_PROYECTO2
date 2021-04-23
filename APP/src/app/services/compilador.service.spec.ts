import { TestBed } from '@angular/core/testing';

import { COMPILADORService } from './compilador.service';

describe('COMPILADORService', () => {
  let service: COMPILADORService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(COMPILADORService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
