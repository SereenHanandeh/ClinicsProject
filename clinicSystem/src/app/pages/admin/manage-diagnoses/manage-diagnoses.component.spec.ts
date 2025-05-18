import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiagnosesComponent } from './manage-diagnoses.component';

describe('ManageDiagnosesComponent', () => {
  let component: ManageDiagnosesComponent;
  let fixture: ComponentFixture<ManageDiagnosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDiagnosesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDiagnosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
