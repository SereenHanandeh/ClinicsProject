import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClinicsComponent } from './manage-clinics.component';

describe('ManageClinicsComponent', () => {
  let component: ManageClinicsComponent;
  let fixture: ComponentFixture<ManageClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClinicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
