import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerGrupoComponent } from './leer-grupo.component';

describe('LeerGrupoComponent', () => {
  let component: LeerGrupoComponent;
  let fixture: ComponentFixture<LeerGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
