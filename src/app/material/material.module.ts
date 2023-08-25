import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatMenuModule } from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class MaterialModule { }
