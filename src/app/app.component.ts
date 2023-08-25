import {Component, computed, effect, inject, ViewChild} from '@angular/core';
import {AuthService} from "./auth/services/auth.service";
import {AuthStatus} from "./auth/interfaces";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidenav', {static: false}) sidenav : MatSidenav | any;

  private authService : AuthService = inject( AuthService );
  private router : Router = inject( Router );

  public isMenuOpen : boolean = false;

  public finishedAuthCheck = computed<boolean>( () => {

    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;

  })

  public authStatusChangedEffect = effect ( () => {

    switch ( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:

        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:

        this.router.navigateByUrl('/auth/login');
        return;

    }


  })

  // Metodos para que funcione el sidenav
  toggleMenu() : void {
    this.isMenuOpen = !this.isMenuOpen;

    if(this.isMenuOpen){

      this.sidenav.open();
    }else{

      this.sidenav.close();
    }
  }

  closeMenu() : void {
    this.isMenuOpen = false;
    this.sidenav.close();
  }

  onMenuOpen() : void {
    // Se pueden agregar acciones adicionales para cuando se abre el menú
    console.log('Menú abierto');
  }

  onMenuClose() : void {
    // Se puede agregar Acciones adicionales para cuando se cierra
    console.log('Menú cerrado')
  }

}
