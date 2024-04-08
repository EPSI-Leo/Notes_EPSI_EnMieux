import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './route-views/login/login.component';
import { CoursComponent } from './route-views/cours/cours-list/cours-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsCoursComponent } from './route-views/cours/cours-details/cours_details.component';
import { CoursAddComponent } from './route-views/cours/cours-add/cours-add.component';
import { CoursEditComponent } from './route-views/cours/cours-edit/cours-edit.component';
import { FormsModule } from '@angular/forms';
import { EvalListComponent } from './route-views/eval/eval-list/eval-list.component';
import { EvalAddComponent } from './route-views/eval/eval-add/eval-add.component';
import { EvalDetailsComponent } from './route-views/eval/eval-details/eval-details.component';
import { EvalEditComponent } from './route-views/eval/eval-edit/eval-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursComponent,
    DetailsCoursComponent,
    CoursAddComponent,
    CoursEditComponent,
    EvalListComponent,
    EvalAddComponent,
    EvalDetailsComponent,
    EvalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
