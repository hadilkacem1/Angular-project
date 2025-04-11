import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAreWe2Component } from './who-are-we2.component';

describe('WhoAreWe2Component', () => {
  let component: WhoAreWe2Component;
  let fixture: ComponentFixture<WhoAreWe2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhoAreWe2Component]
    });
    fixture = TestBed.createComponent(WhoAreWe2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
