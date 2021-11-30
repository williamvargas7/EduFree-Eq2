import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerAsignaturaComponent } from './leer-asignatura.component';

describe('LeerAsignaturaComponent', () => {
  let component: LeerAsignaturaComponent;
  let fixture: ComponentFixture<LeerAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
