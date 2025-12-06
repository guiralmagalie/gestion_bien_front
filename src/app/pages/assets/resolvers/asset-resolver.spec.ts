import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { assetResolver } from './asset-resolver';

describe('assetResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => assetResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
