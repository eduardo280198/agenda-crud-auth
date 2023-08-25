import {Component, computed, inject} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService : AuthService = inject( AuthService );

  private router : Router = inject( Router );

  public user = computed( () => this.authService.currentUser() );

  // onLogout(){
  //
  //   // Consumir el servicio de logout
  //   this.authService.logout()
  //
  // }

}
