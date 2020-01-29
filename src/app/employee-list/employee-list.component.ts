import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Router} from "@angular/router";
import {Employee} from "../models/employee";
import {Store} from "@ngrx/store";
import {Actions} from "@ngrx/effects";
import * as fromState from "src/app/store";
import {SelectEmployeesState} from "src/app/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  searchemp: any;
  display: boolean = false;
  formule: FormGroup;
  constructor(private  employeeService: EmployeeService,private formBuild: FormBuilder, private router: Router,private store: Store<any>,private action$ :Actions) {
  }

  ngOnInit() {
    this.store.dispatch(new fromState.LoadEmployee());
    this.getdata();
    this.formule = window['formule'] = this.formBuild.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      // Validators.email
    });

  }

  getdata() {
    // this.employeeService.getEmployee()
    //   .subscribe((data: any[]) => {
    //     this.employees = data;
    //   })
    console.log('getdata')

    this.store.dispatch(new fromState.LoadEmployee());
    this.store.select(SelectEmployeesState).subscribe(data =>
    {
     console.log(" ---- Data ",data);
     if (data)
      this.employees=Object.values(data)
  })
}
  Edit(employee: Employee) {
    localStorage.setItem("id", employee.id.toString());
    this.router.navigate(["edit"]);
    this.display = true;

  }

  // Delete(id: number) {
  //   this.employeeService.deleteEmployee(id)
  //     .subscribe(
  //       data => {
  //         console.log("deleted with success ...");
  //         console.log(data);
  //         alert(" this employee was deleted ")
  //         this.getdata();
  //       },
  //       error => console.log(error));
  // }
  Delete(idEmployee: number){
    if(confirm("Are you sure You want Delete this employee ?")){


        this.store.dispatch(new fromState.deleteEmployee(idEmployee));

      this.getdata();
      // this.router.navigate(["list"]);
  }}
  searchEmployee() {
    if (this.searchemp) {
      this.employeeService.searchEmployee(this.searchemp)
        .subscribe((data: any) => {
            this.employees = data;
          });
    } else {
      this.getdata();
    }
  }

  // edit() {
  //
  //   this.display = true;
  // }
}
