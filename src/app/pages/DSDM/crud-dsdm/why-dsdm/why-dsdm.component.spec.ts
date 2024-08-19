import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyDsdmComponent } from './why-dsdm.component';

describe('WhyDsdmComponent', () => {
  let component: WhyDsdmComponent;
  let fixture: ComponentFixture<WhyDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
