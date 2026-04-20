import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { StudentTableComponent } from '../../components/student-table/student-table';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterLink, StudentTableComponent, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class StudentsComponent implements OnInit {

  students$!: Observable<any[]>;
  filteredStudents$!: Observable<any[]>;
  
  searchName: string = '';
  selectedDepartment: string = '';
  
  private searchSubject = new BehaviorSubject<{name: string, department: string}>({name: '', department: ''});

  constructor(private service: StudentsService) {}

  ngOnInit() {
    this.students$ = this.service.students$;
    
    this.students$.subscribe(students => {
      if(students && students.length > 0) {
        console.log('Student data sample:', students[0]);
        console.log('Available fields:', Object.keys(students[0]));
      }
    });
    
    this.filteredStudents$ = combineLatest([
      this.students$,
      this.searchSubject.asObservable().pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([students, filters]) => {
        if (!students) return [];
        
        let filtered = [...students];
        
        if (filters.name && filters.name.trim() !== '') {
          const searchTerm = filters.name.toLowerCase().trim();
          filtered = filtered.filter(student => {
            return student.name?.toLowerCase().includes(searchTerm) ||
                   student.firstName?.toLowerCase().includes(searchTerm) ||
                   student.fullName?.toLowerCase().includes(searchTerm) ||
                   student.studentName?.toLowerCase().includes(searchTerm) ||
                   student.userName?.toLowerCase().includes(searchTerm);
          });
        }
        
        if (filters.department && filters.department !== '') {
          filtered = filtered.filter(student => 
            student.department === filters.department ||
            student.dept === filters.department ||
            student.faculty === filters.department
          );
        }
        
        return filtered;
      })
    );
  }
  
  applyFilters() {
    console.log('Searching for:', this.searchName);
    this.searchSubject.next({
      name: this.searchName,
      department: this.selectedDepartment
    });
  }
  
  clearFilters() {
    this.searchName = '';
    this.selectedDepartment = '';
    this.applyFilters();
  }

  onDelete(id: number) {
    this.service.deleteStudent(id);
  }
}