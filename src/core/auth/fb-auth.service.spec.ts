import { TestBed, inject } from '@angular/core/testing';

import { FbAuthService } from './fb-auth.service';

describe('FbAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbAuthService]
    });
  });

  it('should be created', inject([FbAuthService], (service: FbAuthService) => {
    expect(service).toBeTruthy();
  }));
});
