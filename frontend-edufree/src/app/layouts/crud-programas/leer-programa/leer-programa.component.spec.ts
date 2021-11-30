import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerProgramaComponent } from './leer-programa.component';

describe('LeerProgramaComponent', () => {
  let component: LeerProgramaComponent;
  let fixture: ComponentFixture<LeerProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
