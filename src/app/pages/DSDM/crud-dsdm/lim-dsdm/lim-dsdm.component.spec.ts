import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimDsdmComponent } from './lim-dsdm.component';

describe('LimDsdmComponent', () => {
  let component: LimDsdmComponent;
  let fixture: ComponentFixture<LimDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
