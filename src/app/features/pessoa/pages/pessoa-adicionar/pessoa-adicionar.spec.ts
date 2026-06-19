import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaAdicionar } from './pessoa-adicionar';

describe('PessoaAdicionar', () => {
  let component: PessoaAdicionar;
  let fixture: ComponentFixture<PessoaAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
