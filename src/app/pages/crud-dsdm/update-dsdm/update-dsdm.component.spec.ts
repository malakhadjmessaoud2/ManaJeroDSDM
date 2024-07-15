import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDsdmComponent } from './update-dsdm.component';

describe('UpdateDsdmComponent', () => {
  let component: UpdateDsdmComponent;
  let fixture: ComponentFixture<UpdateDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
