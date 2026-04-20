import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudentComponent {

  student: any = { isActive: true, gender: 'Male' };

  constructor(private service: StudentsService, private router: Router) {}

  add() {
    this.student.id = Date.now();
    this.service.addStudent({ ...this.student });
    this.student = { isActive: true, gender: 'Male' };
    this.router.navigate(['/students']);
  }
}