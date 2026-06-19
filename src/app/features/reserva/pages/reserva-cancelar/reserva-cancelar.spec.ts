import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaExcluir } from './reserva-cancelar';

describe('ReservaExcluir', () => {
  let component: ReservaExcluir;
  let fixture: ComponentFixture<ReservaExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
