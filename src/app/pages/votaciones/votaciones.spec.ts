import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votaciones } from './votaciones';

describe('Votaciones', () => {
  let component: Votaciones;
  let fixture: ComponentFixture<Votaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Votaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Votaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
