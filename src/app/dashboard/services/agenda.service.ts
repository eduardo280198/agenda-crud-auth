import { Injectable } from '@angular/core';
import {Persona} from "../interfaces/persona.interface";
import {catchError, map, Observable, of, Subject, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewPersona} from "../interfaces/new-persona.interface";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private baseUrl : string = 'http://localhost:3000/agenda'

  private deleteItemSubject = new Subject<any>()

  constructor(
    private snackbar : MatSnackBar,
    private http : HttpClient
  ) { }

  // Obtener Datos del back(?
  getAgenda() : Observable<Persona[]> {

    return this.http.get<Persona[]>(`${this.baseUrl}`);
  }

  // Obtener un dato por su id
  getPersonaById( id : string ) : Observable<Persona | undefined>  {

    return this.http.get<Persona>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  // Agrega un nuevo dato
  addPersona( persona : NewPersona ) : Observable<NewPersona> {

    console.log(persona);

    return this.http.post<NewPersona>(`${this.baseUrl}/agregar`, persona)
      .pipe(
        catchError ( err => throwError( () => err.err.message))
      )
  }

  // Actualiza un dato ya existente
  updatePersona( persona : Persona ) : Observable<Persona>{

    if(!persona._id) throw Error('Persona Id es requerido.');

    return this.http.patch<Persona>(`${this.baseUrl}/${persona._id}`, persona)
      .pipe();
  }

  // Elimina
  deletePersona( id : string  ) : Observable<Boolean>{
    return this.http.delete<Persona>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError( error => of(false) ),
        map( resp => true)
      )
      .pipe(
        tap( () => this.deleteItemSubject.next(id) )
      );
  }

  // Snackbar
  showSnackBar( message : string ) : void {

    this.snackbar.open( message, 'Cerrar', {
      duration : 5000,
    });
  }

  getDeleteItemObservable() : Observable <Persona> {
    return this.deleteItemSubject.asObservable();
  }

}
