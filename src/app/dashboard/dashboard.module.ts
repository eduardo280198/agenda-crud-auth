import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    FormPageComponent,
    TablePageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
