import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCalificacionesComponent } from './administrador-calificaciones.component';

describe('AdministradorCalificacionesComponent', () => {
  let component: AdministradorCalificacionesComponent;
  let fixture: ComponentFixture<AdministradorCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCalificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
