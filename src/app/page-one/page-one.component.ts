import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;


  span1!:string;
  span2!:string;
  span3!:string;
  
  dialogRef!: MatDialogRef<any>;
  txt='';
selected1='bug';
selected2='developer1';

  form = new FormGroup({
    
    status: new FormControl('reported', [Validators.required]),
    issue: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    developer: new FormControl('', [Validators.required]),
    
    
  }, [Validators.required]);
  

  constructor(public auth: AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid){
      this.auth.addIssues(this.form.value).subscribe(result => {
        if(result.insertedCount===1){
          this.showSuccess("Issue added with succes");
        }else{
          this.showWarning(result.message)
        }
      })
    }else{
      
      this.span1="";
      this.span2="";
      this.span3="";
      if(this.form.controls.issue.invalid){

        this.span1='You should complete this field'
      }
      
      if(this.form.controls.type.invalid){

        this.span2='You should complete this field'
      }
     if(this.form.controls.developer.invalid){

      this.span3='You should complete this field'
     }
    }
  }

  showSuccess(msg:string) {
  
    
      this.dialogRef = this.dialog.open(DialogComponent,{
        width: '30%',
        height:'30%',
        
      }) ;
      
      this.dialogRef.componentInstance.confirmMessage = msg;
        this.dialogRef.componentInstance.message = "Succes"; 
        
this.form = new FormGroup({
    
  status: new FormControl('reported', [Validators.required]),
  issue: new FormControl('', [Validators.required]),
  type: new FormControl('', [Validators.required]),
  developer: new FormControl('', [Validators.required]),
  
  
}, [Validators.required]);
        
      this.span1="";
      this.span2="";
      this.span3="";
   
  }
  showWarning(msg:string) {
    
    this.dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height:'30%',
      
    }) ;
    
    this.dialogRef.componentInstance.confirmMessage = msg;
      this.dialogRef.componentInstance.message = "Warning"; 
  }



}
