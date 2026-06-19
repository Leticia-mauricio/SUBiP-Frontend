import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoConsulta } from './acervo-consulta';

describe('AcervoConsulta', () => {
  let component: AcervoConsulta;
  let fixture: ComponentFixture<AcervoConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcervoConsulta],
    }).compileComponents();

    fixture = TestBed.createComponent(AcervoConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
