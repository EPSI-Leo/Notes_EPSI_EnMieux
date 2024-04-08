import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalDetailsComponent } from './eval-details.component';

describe('EvalDetailsComponent', () => {
  let component: EvalDetailsComponent;
  let fixture: ComponentFixture<EvalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvalDetailsComponent]
    });
    fixture = TestBed.createComponent(EvalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
