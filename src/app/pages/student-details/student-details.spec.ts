import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDetailsComponent } from './student-details';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetailsComponent], // لو standalone
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});