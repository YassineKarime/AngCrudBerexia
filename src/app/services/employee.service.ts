import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
employee:Employee[];
  constructor(private http:HttpClient) {

  }
  getEmployee() {
    console.log("From Service")
    return this.http.get('http://localhost:8080/emp/employees');
  }
  getEmployeeById(id:number) {
    return this.http.get('http://localhost:8080/emp/employees'+ '/' + id);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/emp/delete' + '/' + id);
  }
  updateEmployee(employee: Employee) {
    // console.log("--------- Employee From service",employee);
    return this.http.put('http://localhost:8080/emp/update', employee);
  }
  addEmployee(employee: any) {
    return this.http.post('http://localhost:8080/emp/create', employee);
  }
  searchEmployee(lastName: any) {
    return this.http.get('http://localhost:8080/emp/employees/search/' + lastName);
  }
}

