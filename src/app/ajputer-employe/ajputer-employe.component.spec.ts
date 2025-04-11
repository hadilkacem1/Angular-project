import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjputerEmployeComponent } from './ajputer-employe.component';

describe('AjputerEmployeComponent', () => {
  let component: AjputerEmployeComponent;
  let fixture: ComponentFixture<AjputerEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjputerEmployeComponent]
    });
    fixture = TestBed.createComponent(AjputerEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
