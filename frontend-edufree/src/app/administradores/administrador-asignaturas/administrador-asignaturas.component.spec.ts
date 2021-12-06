import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAsignaturasComponent } from './administrador-asignaturas.component';

describe('AdministradorAsignaturasComponent', () => {
  let component: AdministradorAsignaturasComponent;
  let fixture: ComponentFixture<AdministradorAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorAsignaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
