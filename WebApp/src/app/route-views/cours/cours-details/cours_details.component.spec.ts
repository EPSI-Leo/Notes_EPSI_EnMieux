import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCoursComponent } from './cours_details.component';

describe('DetailsCoursComponent', () => {
  let component: DetailsCoursComponent;
  let fixture: ComponentFixture<DetailsCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCoursComponent]
    });
    fixture = TestBed.createComponent(DetailsCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
