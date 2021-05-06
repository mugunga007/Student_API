import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {
tag_name:string;
@Input() student:Student;
  constructor() { }

  ngOnInit() {

  }
  // addTag(student:Student, tag:string){
  //   student.tag.push(tag);
  //   }

  
}
