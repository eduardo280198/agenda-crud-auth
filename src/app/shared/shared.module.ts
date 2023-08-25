import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MaterialModule} from "../material/material.module";




@NgModule({
  declarations: [
    Error404PageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  exports: [
    NavComponent
  ]
})
export class SharedModule { }
