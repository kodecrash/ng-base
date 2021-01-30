import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecureLayoutComponent } from './secure-layout.component';

describe('SecureLayoutComponent', () => {
  let component: SecureLayoutComponent;
  let fixture: ComponentFixture<SecureLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
