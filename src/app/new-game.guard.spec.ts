import { TestBed, async, inject } from '@angular/core/testing';

import { NewGameGuard } from './new-game.guard';

describe('NewGameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewGameGuard]
    });
  });

  it('should ...', inject([NewGameGuard], (guard: NewGameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
