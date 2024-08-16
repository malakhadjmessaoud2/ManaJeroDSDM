import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDsdmComponent } from './add-dsdm.component';

describe('AddDsdmComponent', () => {
  let component: AddDsdmComponent;
  let fixture: ComponentFixture<AddDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
