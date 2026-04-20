import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  department: string;
  level: number;
  GPA: number;
  enrollmentDate: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students = new BehaviorSubject<Student[]>([
    {
      id: 1,
      firstName: 'Ali',
      lastName: 'Hassan',
      age: 21,
      gender: 'Male',
      email: 'ali.hassan@email.com',
      phone: '01000000000',
      address: '12 Main Street',
      city: 'Cairo',
      country: 'Egypt',
      department: 'Computer Science',
      level: 3,
      GPA: 3.2,
      enrollmentDate: '2023-09-01',
      isActive: true
    },
    {
      id: 2,
      firstName: 'Sara',
      lastName: 'Ahmed',
      age: 20,
      gender: 'Female',
      email: 'sara.ahmed@email.com',
      phone: '01100000000',
      address: '5 Rose Avenue',
      city: 'Alexandria',
      country: 'Egypt',
      department: 'Information Technology',
      level: 2,
      GPA: 3.7,
      enrollmentDate: '2024-09-01',
      isActive: true
    },
    {
      id: 3,
      firstName: 'Mohamed',
      lastName: 'Khaled',
      age: 23,
      gender: 'Male',
      email: 'mohamed.khaled@email.com',
      phone: '01200000000',
      address: '8 Nile Road',
      city: 'Giza',
      country: 'Egypt',
      department: 'Artificial Intelligence',
      level: 4,
      GPA: 2.9,
      enrollmentDate: '2022-09-01',
      isActive: false
    }
  ]);

  students$ = this.students.asObservable();

  addStudent(student: Student) {
    const current = this.students.value;
    const newId = current.length
      ? Math.max(...current.map(s => s.id)) + 1
      : 1;

    const newStudent = { ...student, id: newId };
    this.students.next([...current, newStudent]);
  }

  deleteStudent(id: number) {
    const filtered = this.students.value.filter(s => s.id !== id);
    this.students.next(filtered);
  }

  getStudentById(id: number) {
    return this.students.value.find(s => s.id === id);
  }
}