import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnsecureLayoutComponent } from './unsecure-layout.component';

describe('UnsecureLayoutComponent', () => {
  let component: UnsecureLayoutComponent;
  let fixture: ComponentFixture<UnsecureLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsecureLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsecureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
