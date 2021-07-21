import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {
  dialogRef!: MatDialogRef<any>;
  dataSource: Array<any>=[];
  pageSlice: Array<any>=[];
  constructor(public auth: AuthService,public dialog: MatDialog) { }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.auth.listIssuesDev().subscribe(posts =>{
if(posts.message){
this.showWarning(posts.message)
}else{
  this.dataSource=posts;
  this.pageSlice = this.dataSource.slice(0, 3)
}

    })
  }

  showWarning(msg:string) {
    this.dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height:'25%',
      
    }) ;
    
    this.dialogRef.componentInstance.confirmMessage = msg;
    this.dialogRef.componentInstance.message = "Warning";
   
  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.dataSource.length)
      endIndex = this.dataSource.length;
    this.pageSlice = this.dataSource.slice(startIndex, endIndex)

  }
  
}
