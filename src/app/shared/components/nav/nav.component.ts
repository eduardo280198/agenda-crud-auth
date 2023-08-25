import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AuthStatus} from "../../../auth/interfaces";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public userLoginOn : boolean = false;

  private authService : AuthService = inject( AuthService );

  @Output() closeMenu : EventEmitter<void> = new EventEmitter<void>();

  onOptionSelected() : void {
    this.closeMenu.emit();
  }

  loginButton() : boolean {

    if( this.authService.authStatus() === AuthStatus.authenticated ) {

      return true;
    }

    return false
  }

  onLogout(){

    // Consumir el servicio de logout
    this.closeMenu.emit();

    this.authService.logout()

  }
}
