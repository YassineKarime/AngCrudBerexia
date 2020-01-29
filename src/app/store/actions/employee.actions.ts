import {Action} from "@ngrx/store";
import {Employee} from "../../models/employee";
import {EmployeesState} from "../reducers/employee.reducers";
import {Update} from "@ngrx/entity";
//definir ensample des constants
export enum EmployeeActionType {
  LOAD_EMPLOYEES = '[employee] get items',
  LOAD_EMPLOYEES_FAIL = '[employee] get items fail',
  LOAD_EMPLOYEES_SUCESS = '[employee] get items success',

  CREATE_EMPLOYEES = '[employee] create items',
  CREATE_EMPLOYEES_FAIL = '[employee] create items fail',
  CREATE_EMPLOYEES_SUCESS = '[employee] create items sucess',

  UPDATE_EMPLOYEES = '[employee] update items',
  UPDATE_EMPLOYEES_FAIL = '[employee] update items fail',
  UPDATE_EMPLOYEES_SUCESS = '[employee] update items sucess',

  DELETE_EMPLOYEES = '[employee] delete items',
  DELETE_EMPLOYEES_FAIL = '[employee] delete items fail',
  DELETE_EMPLOYEES_SUCESS = '[employee] delete items sucess',

  SEARCH_EMPLOYEES = '[employee] search items sucess',
  SEARCH_EMPLOYEES_FAIL = '[employee] search items fail',
  SEARCH_EMPLOYEES_SUCESS = '[employee] search items sucess'
}

//action object that implements the Action interface provided by NgRx
export class LoadEmployee implements Action {
  readonly type = EmployeeActionType.LOAD_EMPLOYEES;

  constructor() {
  }
}

export class LoadEmployeeSucess implements Action {
  readonly type = EmployeeActionType.LOAD_EMPLOYEES_SUCESS;

  constructor(public payload: any) {
  }
}

export class LoadEmployeeFail implements Action {
  readonly type = EmployeeActionType.LOAD_EMPLOYEES_FAIL;

  constructor(public payload: any) {
  }
}

export class addEmployee implements Action {
  readonly type = EmployeeActionType.CREATE_EMPLOYEES;

  constructor(public payload: any) {
  }
}

export class addEmployeeSucess implements Action {
  readonly type = EmployeeActionType.CREATE_EMPLOYEES_SUCESS;

  constructor(public payload: any) {
  }
}

export class addEmployeeFail implements Action {
  readonly type = EmployeeActionType.CREATE_EMPLOYEES_FAIL;

  constructor(public payload: any) {
  }
}
export class deleteEmployee implements Action {
  readonly type = EmployeeActionType.DELETE_EMPLOYEES;

  constructor(public payload: any) {
  }
}
export class deleteEmployeeSucess implements Action {
  readonly type = EmployeeActionType.DELETE_EMPLOYEES_SUCESS;

  constructor(public payload: any) {
  }
}
export class deleteEmployeeFail implements Action {
  readonly type = EmployeeActionType.DELETE_EMPLOYEES_FAIL;

  constructor(public payload: any) {
  }
}
export class UpdateEmployee implements Action {
  readonly type = EmployeeActionType.UPDATE_EMPLOYEES;

  constructor(public payload: Employee) {
  }
}
export class UpdateEmployeeFail implements Action {
  readonly type = EmployeeActionType.UPDATE_EMPLOYEES_FAIL;

  constructor(public payload: any) {
  }
}
export class UpdateEmployeeSucess implements Action {
  readonly type = EmployeeActionType.UPDATE_EMPLOYEES_SUCESS;

  constructor(public payload: Update<Employee>) {
  }
}
export type Action =
  LoadEmployee |
  LoadEmployeeSucess |
  LoadEmployeeFail |
  addEmployee |
  addEmployeeSucess |
  addEmployeeFail|
  deleteEmployee|
  deleteEmployeeSucess|
  deleteEmployeeFail|
  UpdateEmployee|
  UpdateEmployeeFail|
  UpdateEmployeeSucess
  ;



