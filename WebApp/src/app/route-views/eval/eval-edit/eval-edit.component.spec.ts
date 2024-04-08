import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalEditComponent } from './eval-edit.component';

describe('EvalEditComponent', () => {
  let component: EvalEditComponent;
  let fixture: ComponentFixture<EvalEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvalEditComponent]
    });
    fixture = TestBed.createComponent(EvalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
