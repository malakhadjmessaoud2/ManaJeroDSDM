import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatifDsdmComponent } from './whatif-dsdm.component';

describe('WhatifDsdmComponent', () => {
  let component: WhatifDsdmComponent;
  let fixture: ComponentFixture<WhatifDsdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatifDsdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatifDsdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
