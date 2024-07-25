import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdmMethodeComponent } from './dsdm-methode.component';

describe('DsdmMethodeComponent', () => {
  let component: DsdmMethodeComponent;
  let fixture: ComponentFixture<DsdmMethodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsdmMethodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsdmMethodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
