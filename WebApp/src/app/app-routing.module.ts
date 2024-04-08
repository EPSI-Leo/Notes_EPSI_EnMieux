import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './route-views/login/login.component';
import { CoursComponent } from './route-views/cours/cours-list/cours-list.component';
import { DetailsCoursComponent } from './route-views/cours/cours-details/cours_details.component';
import { CoursAddComponent } from './route-views/cours/cours-add/cours-add.component';
import { EvalListComponent } from './route-views/eval/eval-list/eval-list.component';
import { EvalDetailsComponent } from './route-views/eval/eval-details/eval-details.component';
import { EvalAddComponent } from './route-views/eval/eval-add/eval-add.component';
import { EvalEditComponent } from './route-views/eval/eval-edit/eval-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cours', component: CoursComponent},
  { path: 'cours-details/:id', component: DetailsCoursComponent},
  { path: 'cours-add', component: CoursAddComponent},
  { path: 'cours-edit', component: CoursAddComponent},
  { path: 'eval', component: EvalListComponent},
  { path: 'eval-details/:id', component: EvalDetailsComponent},
  { path: 'eval-add', component: EvalAddComponent},
  { path: 'eval-edit', component: EvalEditComponent},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
