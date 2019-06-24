import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverPage } from './game-over.page';

describe('GameOverPage', () => {
  let component: GameOverPage;
  let fixture: ComponentFixture<GameOverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
