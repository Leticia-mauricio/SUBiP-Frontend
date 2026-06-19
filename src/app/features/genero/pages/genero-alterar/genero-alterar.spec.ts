import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroAlterar } from './genero-alterar';

describe('GeneroAlterar', () => {
  let component: GeneroAlterar;
  let fixture: ComponentFixture<GeneroAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneroAlterar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
