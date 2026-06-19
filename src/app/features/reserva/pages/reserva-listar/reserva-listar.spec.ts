import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaListar } from './reserva-listar';

describe('ReservaListar', () => {
  let component: ReservaListar;
  let fixture: ComponentFixture<ReservaListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaListar],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
