import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroListar } from './genero-listar';

describe('GeneroListar', () => {
  let component: GeneroListar;
  let fixture: ComponentFixture<GeneroListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroListar],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneroListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
