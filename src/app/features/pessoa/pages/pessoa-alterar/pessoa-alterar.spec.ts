import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaAlterar } from './pessoa-alterar';

describe('PessoaAlterar', () => {
  let component: PessoaAlterar;
  let fixture: ComponentFixture<PessoaAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaAlterar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
