import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoListar } from './emprestimo-listar';

describe('EmprestimoListar', () => {
  let component: EmprestimoListar;
  let fixture: ComponentFixture<EmprestimoListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoListar],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimoListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
