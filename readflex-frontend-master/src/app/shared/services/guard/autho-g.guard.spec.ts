import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authoGGuard } from './autho-g.guard';

describe('authoGGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authoGGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
