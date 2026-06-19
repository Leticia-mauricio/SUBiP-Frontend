import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarAdicionar } from './exemplar-adicionar';

describe('ExemplarAdicionar', () => {
  let component: ExemplarAdicionar;
  let fixture: ComponentFixture<ExemplarAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemplarAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemplarAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
