import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaAdicionar } from './biblioteca-adicionar';

describe('BibliotecaAdicionar', () => {
  let component: BibliotecaAdicionar;
  let fixture: ComponentFixture<BibliotecaAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(BibliotecaAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
