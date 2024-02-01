import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './route-views/login/login.component';
import { CoursComponent } from './route-views/cours/cours.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cours', component: CoursComponent},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
