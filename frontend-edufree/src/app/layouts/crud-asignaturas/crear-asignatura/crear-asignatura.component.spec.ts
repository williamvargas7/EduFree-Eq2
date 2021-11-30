import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsignaturaComponent } from './crear-asignatura.component';

describe('CrearAsignaturaComponent', () => {
  let component: CrearAsignaturaComponent;
  let fixture: ComponentFixture<CrearAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
