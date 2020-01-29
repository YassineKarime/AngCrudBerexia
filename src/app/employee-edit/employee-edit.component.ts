import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../models/employee";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import * as empManagementActions from "../store/actions"

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: Employee[];
  formule: FormGroup;

  // selectedEmp:any=null;
  constructor(private router: Router, private employeeService: EmployeeService, private formBuild: FormBuilder,private store:Store<AppState>) {
  }

  ngOnInit() {

this.edit();
    this.formule = window['formule'] = this.formBuild.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      // Validators.email
    });
  }

  edit() {
    let id = localStorage.getItem("id");
    this.employeeService.getEmployeeById(+id)
      .subscribe(data => {
        console.log("edit objet.values",Object.values(data));
        this.employee = Object.values(data);
        this.formule.patchValue(data);
      });
  }

  save() {
    console.log("------------ component",this.formule.value);
    this.store.dispatch(new empManagementActions.UpdateEmployee(this.formule.value));
    this.router.navigate(["list"]);
    // this.employeeService.updateEmployee(this.formule.value)
    //   .subscribe(data => {
    //
    //   console.log(data);
    //   console.log("save with success",data);
    //
    //     this.router.navigate(["list"]);
    //
    // })
  }

}
