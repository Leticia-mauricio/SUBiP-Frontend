import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroAdicionar } from './livro-adicionar';

describe('LivroAdicionar', () => {
  let component: LivroAdicionar;
  let fixture: ComponentFixture<LivroAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
