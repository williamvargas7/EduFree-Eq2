import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorProgramasComponent } from './administrador-programas.component';

describe('AdministradorProgramasComponent', () => {
  let component: AdministradorProgramasComponent;
  let fixture: ComponentFixture<AdministradorProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorProgramasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
