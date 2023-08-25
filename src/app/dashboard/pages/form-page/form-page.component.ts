import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";

import {AgendaService} from "../../services/agenda.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'agenda-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit{

  public agendaForm : FormGroup | any;



  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private dialog : MatDialog,
    private agendaService : AgendaService
  ) {}

  ngOnInit() : void {

    this.agendaForm = this.fb.group({
      _id       : [''],
      name      : ['', [Validators.required, Validators.maxLength(20)]],
      lastName  : ['', [Validators.required, Validators.maxLength(20)]],
      cellPhone : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email     : ['', Validators.email],
      address   : ['', [Validators.required, Validators.maxLength(50)]]
    });

    /* Redirecciona al usuario a la pantalla de editar, el cual reutiliza el componente del formulario y en caso de conseguir
       un id valido, rellena el formulario con los datos del registro conseguido. */

    // Comprueba si en la url esta incluido editar
    if(!this.router.url.includes('editar')) return;


    this.activatedRoute.params
      .pipe(
        // Recibe una función que toma el valor emitido por agendaService.getPersonaById
        switchMap( ({id}) => this.agendaService.getPersonaById(id) )

        // Cuando el primer observable emite el nuevo valor, se desuscribe automaticamente de este y
        // se suscribe al nuevo observable devuelto
      ) .subscribe( persona => {

      if (!persona) {
        return this.router.navigateByUrl('/dashboard')

      }

      this.agendaForm.reset(persona);
      return
    })
  }

  onSubmit() : void {

    // Actualiza un registro y tal
    if(this.agendaForm.value._id){
      this.updatePersona();
      return;
    }

    //Guardar el registro y tal
    this.addPersona();

  }

  onDelete() : void {
    if(!this.agendaForm.value._id) throw Error('El id es necesario');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data : this.agendaForm.value
    })

    dialogRef.afterClosed().subscribe( result => {
      if(!result) return;

      this.agendaService.deletePersona(this.agendaForm.value._id)
        .subscribe( wasDelete => {
          if(wasDelete) {
            this.router.navigate(['/dashboard']);
            this.agendaService.showSnackBar('Se elimino exitosamente!');
          }
        })
    })


  }

  // Agregar Persona
  addPersona() : void {

    const {_id, ...agenda} = this.agendaForm.value;

    this.agendaService.addPersona(agenda)
      .subscribe( persona => {

        this.router.navigate(['/dashboard']);

        this.agendaService.showSnackBar(`${ persona.name } ${ persona.lastName } agregado!!`);
      } )
  }

  // Edita un registro.
  updatePersona() : void {

    this.agendaService.updatePersona(this.agendaForm.value)
      .subscribe( persona => {

        this.router.navigate(['/dashboard']);

        this.agendaService.showSnackBar(`${ persona.name } ${ persona.lastName } actualizado!!`)
      });
  }

  // Errores
  getErrorEmailMessage() : any {

    if (this.agendaForm.get('email').invalid && this.agendaForm.get('email').touched){

      return 'El email no es valido';
    }
  }

  getErrorMessage() : any {
    if(this.agendaForm.invalid && this.agendaForm.touched){

      return 'Este campo es obligatorio';
    }
  }



}
