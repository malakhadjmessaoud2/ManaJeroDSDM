import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdmDashComponent } from './dsdm-dash.component';

describe('DsdmDashComponent', () => {
  let component: DsdmDashComponent;
  let fixture: ComponentFixture<DsdmDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsdmDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsdmDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
