import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaAdicionar } from './reserva-adicionar';

describe('ReservaAdicionar', () => {
  let component: ReservaAdicionar;
  let fixture: ComponentFixture<ReservaAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
