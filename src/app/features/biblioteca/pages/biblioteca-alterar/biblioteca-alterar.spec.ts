import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaAlterar } from './biblioteca-alterar';

describe('BibliotecaAlterar', () => {
  let component: BibliotecaAlterar;
  let fixture: ComponentFixture<BibliotecaAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(BibliotecaAlterar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
