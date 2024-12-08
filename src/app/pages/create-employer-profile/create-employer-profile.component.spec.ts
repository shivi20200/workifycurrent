import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployerProfileComponent } from './create-employer-profile.component';

describe('CreateEmployerProfileComponent', () => {
  let component: CreateEmployerProfileComponent;
  let fixture: ComponentFixture<CreateEmployerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
