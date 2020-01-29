import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../models/employee";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {EmployeeActionType} from "../store/actions";
import * as fromEmployee from "src/app/store/app.state";
import * as fromEmployeeAction from "src/app/store/actions";


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
    ngOnInit() {
      this.formule = window['formule'] = this.formBuild.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailId: ['', Validators.required],
        // Validators.email
      });

    }
  formule: FormGroup;
  constructor(private router:Router ,private formBuild: FormBuilder, private employeeService:EmployeeService,private store:Store<fromEmployee.AppState>) {

  }


//   createEmployee() {
// this.employeeService.addEmployee(this.formule.value)
//   .subscribe(data=>{
//
//      console.log(this.formule.value);
//      console.log("employee created")
//   this.router.navigate(["list"]);
//   });
//   }
  createEmployee(){
    const employee ={

      firstName:this.formule.get("firstName").value,
      lastName:this.formule.get("lastName").value,
      emailId:this.formule.get("emailId").value,

    }
    this.store.dispatch(new fromEmployeeAction.addEmployee(employee));
    console.log(employee);
    this.router.navigate(["list"]);


  }
}
