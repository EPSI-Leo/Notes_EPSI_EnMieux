import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalAddComponent } from './eval-add.component';

describe('EvalAddComponent', () => {
  let component: EvalAddComponent;
  let fixture: ComponentFixture<EvalAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvalAddComponent]
    });
    fixture = TestBed.createComponent(EvalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
