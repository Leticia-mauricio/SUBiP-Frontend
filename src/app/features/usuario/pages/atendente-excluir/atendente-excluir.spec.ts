import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteExcluir } from './atendente-excluir';

describe('AtendenteExcluir', () => {
  let component: AtendenteExcluir;
  let fixture: ComponentFixture<AtendenteExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendenteExcluir],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendenteExcluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
