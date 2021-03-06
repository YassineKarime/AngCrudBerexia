import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngCrudBerexia';
  constructor( private router:Router) {}

  List(){
    this.router.navigate(["list"]);
  }
  AddEmployee(){
    this.router.navigate(["add"])
  }
}
