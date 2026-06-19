import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroExcluir } from './livro-excluir';

describe('LivroExcluir', () => {
  let component: LivroExcluir;
  let fixture: ComponentFixture<LivroExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
