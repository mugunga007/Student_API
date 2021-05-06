import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';
import { HttpClient } from '@angular/common/http';

import { switchMap, debounceTime } from 'rxjs/operators'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  // Students url
  students_url = "https://www.hatchways.io/api/assessment/students";

  // students list from api
  students: Student[] = [];
  // student list as a search result
  students_dummy: Student[] = this.students;

  // Array to convert api get request
  items = [];

  // ReactiveFormsModule import for forms
  // form group
  nameGroup = new FormGroup({
    searchNameControl: new FormControl()
  });

  // tag input of the form
  tagGroup = new FormGroup({
    searchTagControl: new FormControl()
  });
  // input name of tag
  tag_name: string;

  // formControl of 'search name' form
  searchNameControl: FormControl = new FormControl();

  // formControl of 'search tag' form
  searchTagControl: FormControl = new FormControl();
  constructor(
    // Declaration of student service class 
    private studentService: StudentService,

    // Declaration of http
    private http: HttpClient
  ) { }

  ngOnInit() {

    // Getting students list from api

    this.http.get(this.students_url)
      .toPromise()
      .then(data => {
        for (let key in data)
          if (data.hasOwnProperty(key))
            this.items.push(data[key]);

        this.items.map(students => {
          // get students list as Student[]
          for (var i of students) {
            // Calling calculateAverage() to calculate the average and setting it
            i.average = this.calculateAverage(i.grades);
            // initializing tag array (as null)
            i.tag = [];

            // Adding the student the list with complete info
            this.students.push(i);

          }

        });

      });

    // Searching students by names
    this.searchNameControl.valueChanges.pipe(
      // setting the time to show result (as 1/10 second)
      debounceTime(100),
      switchMap(() => this.searchNameResult(this.searchNameControl.value))
    )
      .subscribe((val) => {
        if (this.searchNameControl.value == '')

          this.students_dummy = this.students;
        else
          this.students_dummy.push(val)
      });

    // Searching students by tags
    this.searchTagControl.valueChanges.pipe(
      debounceTime(100),
      switchMap(() => this.searchTagResult(this.searchTagControl.value))
    )
      .subscribe((val) => {
        if (this.searchTagControl.value == '')
          this.students_dummy = this.students;
        else
          this.students_dummy.push(val)
      });
  }
  // searching by name function
  searchNameResult(name: string): Student[] {
    // initializing the result list
    this.students_dummy = [];
    // initializing the result list after typing
    var n: Student[] = [];
    this.students.forEach((cur, index) => {
      var names = cur.firstName;
      // keep the full list if the input is empty
      if (name == '' || name == null)
        this.students_dummy = this.students;
      // Searching the name (firstname or lastname) 
      else if (name == names.toLowerCase().slice(0, name.length)
        || name == cur.lastName.toLowerCase().slice(0, name.length)

      )
        // Pushing matched student into the result list 
        n.push(cur);

    })
    return n;
  }
  // Search by tag function 
  searchTagResult(tag_name: string): Student[] {
    this.students_dummy = [];
    var n: Student[] = [];
    this.students.forEach((cur, index) => {
      var tags = cur.tag;

      // Setting the list of students when the input is empty 
      for (let tn of tags) {
        if (tag_name == '' || tag_name == null)
          this.students_dummy = this.students;
        // Searching the matching tag 
        else if (tag_name == tn.toLowerCase().slice(0, tag_name.length))

          // Pushing matched student into the result list 
          n.push(cur);
      }
    })
    return n;
  }


  calculateAverage(a: []): number {
    var sum = 0;
    var average = 0;
    var to_number: number;
    for (let i of a) {
      to_number = +i;
      sum = sum + to_number;
    }
    average = sum / a.length;
    return average;
  }

  addTag(student: Student) {
    student.tag.push(this.tag_name); 
    this.tag_name = '';
  }
}
