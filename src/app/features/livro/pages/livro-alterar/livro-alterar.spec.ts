import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroAlterar } from './livro-alterar';

describe('LivroAlterar', () => {
  let component: LivroAlterar;
  let fixture: ComponentFixture<LivroAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroAlterar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
