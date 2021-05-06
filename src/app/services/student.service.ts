import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Student } from '../models/Student';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'}),
  }
@Injectable({
  providedIn: 'root'
})

export class StudentService {
  
 studentsUrl: string = "https://www.hatchways.io/api/assessment/students";
// studentsUrl: string = "https://jsonplaceholder.typicode.com/users";
items = [];
students:Student[] = [];
students_dummy: Student[] =[];
oblist:Observable<Student[]>;
  constructor(
   private http: HttpClient
  ) {
    
   
   }

  // getStudents():Observable<Student[]>{
  //  return this.http.get<Student[]>(this.studentsUrl,httpOptions);
  // }

// ----------------------------------------------------------------

    
   
}
