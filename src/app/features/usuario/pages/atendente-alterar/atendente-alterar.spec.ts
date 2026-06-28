import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteAlterar } from './atendente-alterar';

describe('AtendenteAlterar', () => {
  let component: AtendenteAlterar;
  let fixture: ComponentFixture<AtendenteAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendenteAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendenteAlterar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
