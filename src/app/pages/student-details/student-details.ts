import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css']
})
export class StudentDetailsComponent implements OnInit {

  student: any;

  constructor(
    private route: ActivatedRoute,
    private service: StudentsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.service.getStudentById(id);
  }
}