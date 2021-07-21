import { AfterViewInit, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay, filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  
  dialogRef!: MatDialogRef<any>;
  mesg!:any;
  clickedRows = new Set<Issues>();
  reported = 'reported';
  opened = 'opened';
  progress = 'in progress';
  solved = 'solved';
  selected1 = "";
  selected2 = "";
  selected3 = "";
  selected4 = "";
  statusControl = new FormControl();
  reporterControl = new FormControl();
  typeControl = new FormControl();
  developerControl = new FormControl();
  displayedColumns: string[] = ['_id', 'status', 'issue', 'type', 'author', 'developer'];
  dataSource: Array<any>=[];
  pageSlice: Array<any>=[];
  form!:any;



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor( private ngZone:NgZone,private auth: AuthService,public dialog: MatDialog,private router:Router) {

  }
  ngOnInit(): void {
    

    this.auth.getIssues().subscribe(posts => {
      
      this.dataSource = posts
      this.pageSlice = this.dataSource.slice(0, 5)
    })
    this.statusControl.valueChanges.subscribe(value => this.auth.filterIssueByStatus(value).subscribe(post => {
      this.dataSource = post
      this.pageSlice = this.dataSource.slice(0, 5)
    }
    ))
    this.reporterControl.valueChanges.subscribe(value => this.auth.filterIssueByReporter(value).subscribe(post => {
      this.dataSource = post
      this.pageSlice = this.dataSource.slice(0, 5)
    }
    ))
    this.typeControl.valueChanges.subscribe(value => this.auth.filterIssueByType(value).subscribe(post => {
      this.dataSource = post
      this.pageSlice = this.dataSource.slice(0, 5)
    }
    ))
    this.developerControl.valueChanges.subscribe(value => this.auth.filterIssueByDeveloper(value).subscribe(post => {
      this.dataSource = post
      this.pageSlice = this.dataSource.slice(0, 5)
    }
    ))
  }

  // ngAfterViewInit() {

  //   this.dataSource.paginator = this.paginator;
  // }
  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.dataSource.length)
      endIndex = this.dataSource.length;
    this.pageSlice = this.dataSource.slice(startIndex, endIndex)

  }
  
  add(row:Issues){
    this.clickedRows.forEach(issue => this.clickedRows.delete(issue));
    this.clickedRows.add(row)
  
  this.form = new FormGroup({
    
    status: new FormControl(row.status, [Validators.required]),
    issue: new FormControl(row.issue, [Validators.required]),
    type: new FormControl(row.type, [Validators.required]),
    developer: new FormControl(row.developer, [Validators.required]),
    
    
  }, [Validators.required]);
  }

  onSubmit(id:number){
    if(this.form.valid){
     
      this.auth.updateIssueByReporter(id,this.form.value).subscribe(post =>{
        this.mesg = post
        if(this.mesg.message === "updated"){
          this.showSuccess(this.mesg.message)
          this.dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
          
        }else{

        this.showWarning(this.mesg.message)
        }
        
         });
    }
  }
  showWarning(msg:string) {
    
    this.dialogRef = this.dialog.open(DialogComponent,{
      width: '35%',
      height:'35%',
      
    }) ;
    if(msg === 'failed updating'){
      msg = "You didn't changed anything from the fields you want to update"
      this.dialogRef.componentInstance.confirmMessage = msg;
      this.dialogRef.componentInstance.message = "Warning";
      this.dialogRef.componentInstance.bool1=true; 
      this.dialogRef.afterClosed().pipe(filter(result => result === 'A')).subscribe(() => {
        window.location.reload();
      });
    }else {
      this.dialogRef.componentInstance.confirmMessage = msg;
      this.dialogRef.componentInstance.message = "Warning";
      this.dialogRef.afterClosed().subscribe(() => {
        window.location.reload();
      });
     
     
    }
    
  
  }
  showSuccess(msg:string) {
    
    this.dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height:'30%',
      
    }) ;
    
    this.dialogRef.componentInstance.confirmMessage = msg;
      this.dialogRef.componentInstance.message = "Succes";
  }
}


export interface Issues {
  _id: number;
  status: string;
  issue: string;
  type: string;
  author: string;
  developer: string;
}




