import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StudentsComponent } from './pages/students/students';
import { AddStudentComponent } from './pages/add-student/add-student';
import { StudentDetailsComponent } from './pages/student-details/student-details';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'student/:id', component: StudentDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];