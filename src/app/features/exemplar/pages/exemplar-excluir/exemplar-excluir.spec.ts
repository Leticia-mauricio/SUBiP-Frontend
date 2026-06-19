import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarExcluir } from './exemplar-excluir';

describe('ExemplarExcluir', () => {
  let component: ExemplarExcluir;
  let fixture: ComponentFixture<ExemplarExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemplarExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemplarExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
