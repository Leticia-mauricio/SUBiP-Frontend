import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoAdicionar } from './emprestimo-adicionar';

describe('EmprestimoAdicionar', () => {
  let component: EmprestimoAdicionar;
  let fixture: ComponentFixture<EmprestimoAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimoAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
