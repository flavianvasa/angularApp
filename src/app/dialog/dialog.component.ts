import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public bool =false;
  public bool1 = false;
  //dialogRef!: MatDialogRef<any>;
  public confirmMessage!: string;
  public message!:string;
  constructor(public dialog: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }
  onClick(str:string): void {
    this.dialog.close(str);
  }
}
