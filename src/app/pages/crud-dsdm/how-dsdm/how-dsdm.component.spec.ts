import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowDsdmComponent } from './how-dsdm.component';

describe('HowDsdmComponent', () => {
  let component: HowDsdmComponent;
  let fixture: ComponentFixture<HowDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
