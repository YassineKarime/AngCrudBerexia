import * as fromEmployee from "src/app/store/actions/employee.actions";
import {Employee} from "src/app/models/employee";
import * as _ from "lodash";
import {addEmployee} from "src/app/store/actions/employee.actions";

export interface EmployeesState {
  AllEmployees: any[],
  loaded: boolean,
  loading: boolean,
}

const initialState: EmployeesState = {
  AllEmployees: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromEmployee.Action) {
  switch (action.type) {

    case fromEmployee.EmployeeActionType.SAVE_EMPLOYEES: {
      return {
        ...state,
        AllEmployees: action.payload.employees,
        loaded: !!(action.payload.employees && action.payload.employees.length>0)
      };
    }

    case fromEmployee.EmployeeActionType.LOAD_EMPLOYEES: {
      return _.merge({}, state, {loading: true});
    }
    case fromEmployee.EmployeeActionType.LOAD_EMPLOYEES_SUCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        AllEmployees: action.payload
      }
    }
    case fromEmployee.EmployeeActionType.LOAD_EMPLOYEES_FAIL: {
      return _.merge({}, state, {
        loading: false,
        loaded: false
      });
    }
    case fromEmployee.EmployeeActionType.CREATE_EMPLOYEES_SUCESS: {
      return new fromEmployee.addEmployee(action.payload)
    }
    case fromEmployee.EmployeeActionType.CREATE_EMPLOYEES_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case fromEmployee.EmployeeActionType.DELETE_EMPLOYEES_SUCESS : {
      return new fromEmployee.deleteEmployee(action.payload)
    }

    case fromEmployee.EmployeeActionType.DELETE_EMPLOYEES_FAIL : {
      return {
        ...state,
        error: action.payload
      }
    }
    default: {
      return state;
    }


    case fromEmployee.EmployeeActionType.UPDATE_EMPLOYEES_SUCESS : {
      return new fromEmployee.UpdateEmployeeSucess(action.payload)
    }
    case
    fromEmployee.EmployeeActionType.UPDATE_EMPLOYEES_FAIL
    : {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case fromEmployee.EmployeeActionType.SEARCH_EMPLOYEES_SUCESS:
      return {
        ...state,
        AllEmployees: action.payload,
        loading: false
      };

    case fromEmployee.EmployeeActionType.SEARCH_EMPLOYEES_FAIL:
      return {
        ...state,
        searchEmployee: null
      };
  }
}
