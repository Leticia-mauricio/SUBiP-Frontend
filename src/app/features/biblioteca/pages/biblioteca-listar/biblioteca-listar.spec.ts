import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaListar } from './biblioteca-listar';

describe('BibliotecaListar', () => {
  let component: BibliotecaListar;
  let fixture: ComponentFixture<BibliotecaListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaListar],
    }).compileComponents();

    fixture = TestBed.createComponent(BibliotecaListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
