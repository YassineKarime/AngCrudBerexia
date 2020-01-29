import {Employee} from "../models/employee";

export interface AppState {
  employees :Employee[];
  employee : Employee
  // editEmployeeId : number;
}
