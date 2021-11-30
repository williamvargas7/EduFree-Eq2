import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProgramaComponent } from './modificar-programa.component';

describe('ModificarProgramaComponent', () => {
  let component: ModificarProgramaComponent;
  let fixture: ComponentFixture<ModificarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
