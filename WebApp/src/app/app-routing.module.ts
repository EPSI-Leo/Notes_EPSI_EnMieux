import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './route-views/login/login.component';
import { CoursComponent } from './route-views/cours/cours-list/cours-list.component';
import { DetailsCoursComponent } from './route-views/cours/cours-details/cours_details.component';
import { CoursAddComponent } from './route-views/cours/cours-add/cours-add.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cours', component: CoursComponent},
  { path: 'cours-details/:id', component: DetailsCoursComponent},
  { path: 'cours-add', component: CoursAddComponent},
  { path: 'cours-edit', component: CoursAddComponent},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
