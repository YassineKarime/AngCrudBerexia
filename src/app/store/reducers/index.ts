import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store'
import * as FromReducers from "src/app/store/reducers/employee.reducers"
import {EmployeesState} from"src/app/store/reducers/employee.reducers"
import {Employee} from "../../models/employee";

export interface EmpModuleState {

  employeesManagement: FromReducers.EmployeesState,

}

export const reducers: ActionReducerMap<EmpModuleState> = {

  employeesManagement: FromReducers.reducer,


}

export const SelectEmployeesState = (state: EmployeesState) => Object.assign(state).employeesManagement.AllEmployees;
// export const selectEmployeeById = (state: EmployeesState) => Object.assign(state).employeesManagement.EmployeeById == null? new Employee():Object.assign(state).employeesManagement.EmployeeById ;
