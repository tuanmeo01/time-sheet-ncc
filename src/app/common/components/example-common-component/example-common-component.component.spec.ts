import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCommonComponentComponent } from './example-common-component.component';

describe('ExampleCommonComponentComponent', () => {
  let component: ExampleCommonComponentComponent;
  let fixture: ComponentFixture<ExampleCommonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleCommonComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleCommonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
