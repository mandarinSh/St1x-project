import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpageComponent } from './dialogpage.component';

describe('DialogpageComponent', () => {
  let component: DialogpageComponent;
  let fixture: ComponentFixture<DialogpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
