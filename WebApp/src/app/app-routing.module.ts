import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './route-views/login/login.component';
import { CoursComponent } from './route-views/cours/cours-list/cours-list.component';
import { DetailsCoursComponent } from './route-views/cours/cours-details/cours_details.component';
import { CoursAddComponent } from './route-views/cours/cours-add/cours-add.component';
import { EvalListComponent } from './route-views/eval/eval-list/eval-list.component';
import { EvalAddComponent } from './route-views/eval/eval-add/eval-add.component';
import { CoursEditComponent } from './route-views/cours/cours-edit/cours-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent , data: { hideNav: true } },
  { path: 'cours', component: CoursComponent },
  { path: 'cours-details/:id', component: DetailsCoursComponent },
  { path: 'cours-add', component: CoursAddComponent },
  { path: 'cours-edit', component: CoursEditComponent },
  { path: 'eval', component: EvalListComponent },
  { path: 'eval-add/:id', component: EvalAddComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
