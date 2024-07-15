import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDsdmComponent } from './delete-dsdm.component';

describe('DeleteDsdmComponent', () => {
  let component: DeleteDsdmComponent;
  let fixture: ComponentFixture<DeleteDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
