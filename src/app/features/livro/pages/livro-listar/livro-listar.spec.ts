import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroListar } from './livro-listar';

describe('LivroListar', () => {
  let component: LivroListar;
  let fixture: ComponentFixture<LivroListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroListar],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
