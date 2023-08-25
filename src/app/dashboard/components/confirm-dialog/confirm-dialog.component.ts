import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Persona} from "../../interfaces/persona.interface";

@Component({
  selector: 'agenda-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef : MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Persona,
  ){}

  onNoClick() : void {
    this.dialogRef.close(false);
  }

  onConfirm() : void {
    this.dialogRef.close(true);
  }
}
