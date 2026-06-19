import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAdicionar } from './usuario-adicionar';

describe('UsuarioAdicionar', () => {
  let component: UsuarioAdicionar;
  let fixture: ComponentFixture<UsuarioAdicionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioAdicionar],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioAdicionar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
