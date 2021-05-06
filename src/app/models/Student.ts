export class Student{
  id?:string;
  city:string;
  company:string;
  email:string;
  firstName: string;
  grades?:number[];
  lastName:string;
  pic:string;
  skill:string;
   average?:number;
   grades_shown:boolean = false;
   tag?:string[] =[];
  constructor(){
    
  }
}