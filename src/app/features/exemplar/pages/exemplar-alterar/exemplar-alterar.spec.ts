import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarAlterar } from './exemplar-alterar';

describe('ExemplarAlterar', () => {
  let component: ExemplarAlterar;
  let fixture: ComponentFixture<ExemplarAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemplarAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemplarAlterar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
