import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeService} from "src/app/services/employee.service";
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {reducers} from "./store/reducers";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {effects} from "./store/effects";
import {DialogModule} from 'primeng/dialog';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    DialogModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({maxAge: 25}),
  ],
  providers: [EmployeeService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
