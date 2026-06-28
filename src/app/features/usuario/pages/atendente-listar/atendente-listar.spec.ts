import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteListar } from './atendente-listar';

describe('AtendenteListar', () => {
  let component: AtendenteListar;
  let fixture: ComponentFixture<AtendenteListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendenteListar],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendenteListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
