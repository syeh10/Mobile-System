import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsPage } from './sounds.page';

describe('SoundsPage', () => {
  let component: SoundsPage;
  let fixture: ComponentFixture<SoundsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SoundsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
