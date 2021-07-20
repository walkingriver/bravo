import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { InProgressGuard } from './in-progress.guard';

describe('InProgressGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InProgressGuard]
    });
  });

  it('should ...', inject([InProgressGuard], (guard: InProgressGuard) => {
    expect(guard).toBeTruthy();
  }));
});
