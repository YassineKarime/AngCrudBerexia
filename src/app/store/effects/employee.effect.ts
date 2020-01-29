import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as empManagementActions from "src/app/store/actions/employee.actions";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {EmployeeService} from "src/app/services/employee.service";
import {Action, Store} from "@ngrx/store";
import {EmployeeActionType, GetEmployeesAction, SearchEmployee} from "src/app/store/actions/employee.actions";
import {Employee} from "../../models/employee";
import {AppState} from "../app.state";

@Injectable()
export class employeesEffect {

  public constructor(private actions$: Actions, private store$: Store<AppState>, private employeeService: EmployeeService) {
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
  addEmployee$ = this.actions$.pipe(ofType(
    empManagementActions.EmployeeActionType.CREATE_EMPLOYEES
  )).pipe(
    switchMap(({payload}: any) =>
      this.employeeService.addEmployee(payload)
        .pipe(
          mergeMap((content) => of(new empManagementActions.addEmployeeSucess(payload))),
          catchError(error => of(new empManagementActions.addEmployeeFail(error)))
        )
    )
  );
  @Effect()
  deleteEmployee$ = this.actions$.pipe(
    ofType(empManagementActions.EmployeeActionType.DELETE_EMPLOYEES)).pipe(
    map((action: empManagementActions.deleteEmployee) => action.payload),
    mergeMap((id: number) => this.employeeService.deleteEmployee(id).pipe(
      map(() => new empManagementActions.deleteEmployeeSucess(id)
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

  @Effect({dispatch: false})
  searchEmployee$ = this.actions$.pipe(
    ofType(empManagementActions.EmployeeActionType.SEARCH_EMPLOYEES),
    switchMap((action: SearchEmployee) => {
      return this.employeeService.searchEmployee(action.payload).pipe(
          map((res: Employee[]) => new empManagementActions.LoadEmployeeSucess(res)),
          catchError(error => of(new empManagementActions.SearchEmployeeFail(error)))
        )
    })
  );

  @Effect({dispatch: false})
  getEmployee$ = this.actions$.pipe(
    ofType(empManagementActions.EmployeeActionType.GET_EMPLOYEES),
    map((action: GetEmployeesAction) =>
      // this.employeeService.searchEmployee(action.payload.req).pipe(
      //     mergeMap((res: Employee[]) => of(new empManagementActions.SaveEmployeesAction({employees: res}))),
      //     catchError(error => of(new empManagementActions.SaveEmployeesAction({employees: []})))
      //   )
      this.employeeService.searchEmployee(action.payload.req).subscribe((res: Employee[]) => {
        this.store$.dispatch(new empManagementActions.SaveEmployeesAction({employees: res}))
      }, err => {
        this.store$.dispatch(new empManagementActions.SaveEmployeesAction({employees: []}))
      })
    )
  );


}
