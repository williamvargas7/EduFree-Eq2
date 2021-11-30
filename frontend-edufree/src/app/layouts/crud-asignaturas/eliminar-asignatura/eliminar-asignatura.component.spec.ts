import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAsignaturaComponent } from './eliminar-asignatura.component';

describe('EliminarAsignaturaComponent', () => {
  let component: EliminarAsignaturaComponent;
  let fixture: ComponentFixture<EliminarAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
