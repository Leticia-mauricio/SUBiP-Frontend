import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarListar } from './exemplar-listar';

describe('ExemplarListar', () => {
  let component: ExemplarListar;
  let fixture: ComponentFixture<ExemplarListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemplarListar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemplarListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
