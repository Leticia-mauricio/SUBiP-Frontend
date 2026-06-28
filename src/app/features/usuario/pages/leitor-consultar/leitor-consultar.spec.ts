import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitorConsultar } from './leitor-consultar';

describe('LeitorConsultar', () => {
  let component: LeitorConsultar;
  let fixture: ComponentFixture<LeitorConsultar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeitorConsultar],
    }).compileComponents();

    fixture = TestBed.createComponent(LeitorConsultar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
