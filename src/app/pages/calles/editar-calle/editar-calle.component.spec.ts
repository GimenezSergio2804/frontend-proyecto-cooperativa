import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCalleComponent } from './editar-calle.component';

describe('EditarCalleComponent', () => {
  let component: EditarCalleComponent;
  let fixture: ComponentFixture<EditarCalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
