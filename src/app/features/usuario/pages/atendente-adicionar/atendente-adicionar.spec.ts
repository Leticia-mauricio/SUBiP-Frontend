import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteAdicionar } from './atendente-adicionar';

describe('AtendenteAdicionar', () => {
  let component: AtendenteAdicionar;
  let fixture: ComponentFixture<AtendenteAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendenteAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendenteAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
