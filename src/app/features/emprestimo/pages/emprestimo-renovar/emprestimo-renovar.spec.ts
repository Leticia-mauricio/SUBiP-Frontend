import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoRenovar } from './emprestimo-renovar';

describe('EmprestimoRenovar', () => {
  let component: EmprestimoRenovar;
  let fixture: ComponentFixture<EmprestimoRenovar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoRenovar],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimoRenovar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
