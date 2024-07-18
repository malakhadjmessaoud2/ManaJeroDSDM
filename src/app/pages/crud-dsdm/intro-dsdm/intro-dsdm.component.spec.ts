import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDsdmComponent } from './intro-dsdm.component';

describe('IntroDsdmComponent', () => {
  let component: IntroDsdmComponent;
  let fixture: ComponentFixture<IntroDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
