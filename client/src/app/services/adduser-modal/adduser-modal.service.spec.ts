import { TestBed } from '@angular/core/testing';

import { AdduserModalService } from './adduser-modal.service';

describe('AdduserModalService', () => {
  let service: AdduserModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdduserModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
