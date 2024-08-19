import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSDMComponent } from './dsdm.component';

describe('DSDMComponent', () => {
  let component: DSDMComponent;
  let fixture: ComponentFixture<DSDMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSDMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DSDMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
