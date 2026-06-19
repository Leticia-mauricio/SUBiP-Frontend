import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroExcluir } from './genero-excluir';

describe('GeneroExcluir', () => {
  let component: GeneroExcluir;
  let fixture: ComponentFixture<GeneroExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneroExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
