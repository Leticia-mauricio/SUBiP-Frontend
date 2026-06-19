import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaExcluir } from './biblioteca-excluir';

describe('BibliotecaExcluir', () => {
  let component: BibliotecaExcluir;
  let fixture: ComponentFixture<BibliotecaExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(BibliotecaExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
