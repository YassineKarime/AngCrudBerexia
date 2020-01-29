import {Injectable} from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as empManagementActions from "src/app/store/actions/employee.actions";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {EmployeeService} from "src/app/services/employee.service";
import {Action} from "@ngrx/store";
import {EmployeeActionType} from "src/app/store/actions/employee.actions";
import {Employee} from "../../models/employee";

@Injectable()
export class employeesEffect {

  public constructor(private actions$: Actions,private employeeService: EmployeeService) {
  }

  @Effect()
  getAllEmployees$ = this.actions$.pipe(ofType(
    empManagementActions.EmployeeActionType.LOAD_EMPLOYEES
  )).pipe(
    switchMap(({payload}: any) =>
      this.employeeService.getEmployee()
        .pipe(
          mergeMap((content) => of(new empManagementActions.LoadEmployeeSucess(content))),
          catchError(error => of(new empManagementActions.LoadEmployeeFail(error)))
        )
    )
  );
  @Effect()
  addEmployee$=this.actions$.pipe(ofType(
    empManagementActions.EmployeeActionType.CREATE_EMPLOYEES
  )).pipe(
    switchMap(({payload}:any)=>
      this.employeeService.addEmployee(payload)
        .pipe(
        mergeMap((content)=>of (new empManagementActions.addEmployeeSucess(payload))),
        catchError(error =>of(new empManagementActions.addEmployeeFail(error)))
      )
    )
  );
  @Effect()
  deleteEmployee$=this.actions$.pipe(
    ofType(empManagementActions.EmployeeActionType.DELETE_EMPLOYEES)).pipe(
    map((action : empManagementActions.deleteEmployee) => action.payload),
    mergeMap((id:number) => this.employeeService.deleteEmployee(id).pipe(
       map(()=> new empManagementActions.deleteEmployeeSucess(id)
      ),
      catchError(err => of(new empManagementActions.deleteEmployeeFail(err)))
      )
    )
  );
  @Effect()
  updateEmployee$ = this.actions$.pipe(
    //`ofType<T>('something')` the result is an `Observable<T>`
    ofType(empManagementActions.EmployeeActionType.UPDATE_EMPLOYEES))
    .pipe(
    map((action: empManagementActions.UpdateEmployee) => action.payload),
    mergeMap((employee: Employee) =>
      this.employeeService.updateEmployee(employee).pipe(
        map(
          (updatedEmployee: Employee) =>
            new empManagementActions.UpdateEmployeeSucess({
              id: updatedEmployee.id,
              changes: updatedEmployee
            })
        ),

        catchError(err => of(new empManagementActions.UpdateEmployeeFail(err)))
      )
    )
  );
}
