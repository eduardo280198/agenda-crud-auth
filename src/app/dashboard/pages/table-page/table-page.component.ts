import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Persona} from "../../interfaces/persona.interface";
import {AgendaService} from "../../services/agenda.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'agenda-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit, AfterViewInit{

  public displayColumns : string[] = ['name', 'lastName', 'cellPhone', 'email', 'address'];
  public displayColumnsActions : string[] = [...this.displayColumns, 'actions' ]
  public dataSource : MatTableDataSource<Persona> = new MatTableDataSource<Persona>();

  public agendaList : Persona[] = [];

  private deleteItemSubscription ?: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  constructor(
    private dialog : MatDialog,
    private snackbar : MatSnackBar,
    private agendaService : AgendaService
  ) {
  }

  ngOnInit() : void {

    this.getItems();

    this.deleteItemSubscription = this.agendaService.getDeleteItemObservable()
      .subscribe( () => {
        this.getItems();
      })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() : void{
    this.deleteItemSubscription?.unsubscribe();
  }

  getItems() : void {

    this.agendaService.getAgenda()
      .subscribe( agenda  => {

        this.agendaList = agenda;

        // Ordena el array por orden alfabetico
        this.agendaList.sort( (a : Persona, b : Persona) => a.name.localeCompare(b.name));

        // Se le asigna los valores a dataSource, quien es el que da los valores a la tabla
        this.dataSource.data = this.agendaList;
      })
  }

  // Elimina un registro
  onDelete( persona: Persona ) : void{

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data : persona
    });

    dialogRef.afterClosed().subscribe( result => {

      if(!result) return;

      this.agendaService.deletePersona( persona._id )
        .subscribe( wasDelete => {

          if(wasDelete){

            this.agendaService.showSnackBar('Se elimino exitosamente!');
          }
        });
    })
  }

  // Metodo que usa el buscador
  applyFilter(event : Event) : void {
    const filterValue : string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
