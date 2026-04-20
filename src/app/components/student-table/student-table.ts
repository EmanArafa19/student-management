import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-table.html',
  styleUrl: './student-table.css'
})
export class StudentTableComponent {
  @Input() students: any[] | null = [];
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router) {}

  view(id: number) {
    this.router.navigate(['/student', id]);
  }

  deleteStudent(id: number) {
    this.delete.emit(id);
  }
}