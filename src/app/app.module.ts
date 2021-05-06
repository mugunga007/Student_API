import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TagComponent } from './components/tag/tag.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TagComponent,
    TagFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
   Ng2SearchPipeModule,
   ReactiveFormsModule,
   FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
