import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoDevolver } from './emprestimo-devolver';

describe('EmprestimoDevolver', () => {
  let component: EmprestimoDevolver;
  let fixture: ComponentFixture<EmprestimoDevolver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoDevolver],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimoDevolver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
