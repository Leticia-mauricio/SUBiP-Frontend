import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaExcluir } from './pessoa-excluir';

describe('PessoaExcluir', () => {
  let component: PessoaExcluir;
  let fixture: ComponentFixture<PessoaExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
