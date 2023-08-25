import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";

import {AuthStatus, CheckTokenResponse, LoginResponse, RegisterUser, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal< User | null >(null);
  private _authStatus = signal< AuthStatus >( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {

    this.checkAuthStatus().subscribe();
  }

  private setAuthentication ( user : User, token : string ) : boolean {

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }

  loginUser( email : string, password : string ) : Observable<boolean>{

    const url : string = `${ this.baseUrl }/auth/login`;

    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( ({ user, token  }) => this.setAuthentication( user, token ) ),

        // TODO: Errores
        catchError( err => throwError( () => err.error.message ))
      );

  }

  registerUser( newUser : RegisterUser ) : Observable<RegisterUser>{

    const url : string = `${ this.baseUrl }/auth/register`

    return this.http.post<RegisterUser>(url, newUser)
      .pipe(

        catchError( err => throwError( () => err.error.message ))
      );
  }

  logout(){

    // Borrar el token del local storage
    localStorage.removeItem('token');
    // Cambiar el status a notAuthenticated
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );

  }

  checkAuthStatus () : Observable<boolean> {

    const url : string = `${ this.baseUrl}/auth/check-token`;
    const token : string | null  = localStorage.getItem('token');

    if( !token ) {

      this.logout();
      of(false);
    }

    const headers : HttpHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<CheckTokenResponse>( url, { headers })
      .pipe(

        map( ({ user, token }) => this.setAuthentication( user, token ) ),

        //Error
        catchError( () => {

          this._authStatus.set( AuthStatus.notAuthenticated );

          return of(false);
        } )
      )

  }
}
