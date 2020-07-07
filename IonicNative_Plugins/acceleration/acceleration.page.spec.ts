import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerationPage } from './acceleration.page';

describe('AccelerationPage', () => {
  let component: AccelerationPage;
  let fixture: ComponentFixture<AccelerationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccelerationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelerationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
