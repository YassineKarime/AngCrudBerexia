import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {EmployeeAddComponent} from "./employee-add/employee-add.component";


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'list', component: EmployeeListComponent },
  { path: 'add', component: EmployeeAddComponent},
  { path: 'edit', component: EmployeeEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
