import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroAdicionar } from './genero-adicionar';

describe('GeneroAdicionar', () => {
  let component: GeneroAdicionar;
  let fixture: ComponentFixture<GeneroAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneroAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
