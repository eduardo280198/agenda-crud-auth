import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardLayoutComponent} from "./layout/dashboard-layout/dashboard-layout.component";
import {TablePageComponent} from "./pages/table-page/table-page.component";
import {FormPageComponent} from "./pages/form-page/form-page.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: TablePageComponent },
      { path: 'agregar', component: FormPageComponent },
      { path: 'editar/:id', component: FormPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
