import { TestBed, async, inject } from '@angular/core/testing';

import { InstructionGuard } from './instruction.guard';

describe('InstructionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructionGuard]
    });
  });

  it('should ...', inject([InstructionGuard], (guard: InstructionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
