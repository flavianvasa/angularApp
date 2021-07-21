import { Component, OnInit } from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-page-three',
  templateUrl: './page-three.component.html',
  styleUrls: ['./page-three.component.scss']
})
export class PageThreeComponent implements OnInit {
  span!:string;
  statusControl = new FormControl ('',[Validators.required]);
id!:number;
bool =false;
  constructor(private route: ActivatedRoute,private auth:AuthService,public dialog: MatDialog) { 
    
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['p2']){

        this.id =Number( params['p2']);
        this.bool=true;
      }
   
  });
  this.statusControl.valueChanges.subscribe(() =>{
    this.span='';
  })
  

  }
  
  onSubmit(){
    if(this.statusControl.valid){
      this.auth.updateStatusByDev({id:this.id,status:this.statusControl.value}).subscribe(post =>{
      

          this.show(post.message)
          if(!(post.message === 'failed updating'))
          this.bool=false;
        
      })
    }else{
      this.span="You should complete this field";
      
    }
  }

  
  
  show(msg:string) {
    
   const dialog= this.dialog.open(DialogComponent,{
      width: '35%',
      height:'35%',
      
    }) ;
    
    if(msg==='updated'){
      dialog.componentInstance.message = "Succes"; 
      
    dialog.componentInstance.confirmMessage = msg;
    }else{
      dialog.componentInstance.message = "Warning";
      
    dialog.componentInstance.confirmMessage = "This status exists, choose another one";
    dialog.componentInstance.bool=true;
    }
    dialog.afterClosed().pipe(filter(result => result === 'A')).subscribe(() => {
      this.bool=false
    });
  }
  
}
