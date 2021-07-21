import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';
import { MatTab, MatTabLink } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-with-subpages',
  templateUrl: './page-with-subpages.component.html',
  styleUrls: ['./page-with-subpages.component.scss'],
})
export class PageWithSubpagesComponent implements OnInit {
  // @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger!: MatMenuTrigger;
  // @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger!: MatMenuTrigger;
  
  param1!:number;
  isFirstTabVisible =false;
  isSecondTabVisible=false;
  isThirdTabVisible =false;
  //isFouthTabVisible=false;

  // someMethod() {
  //   this.clickHoverMenuTrigger.openMenu();
  // }
  constructor(private router:Router,private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['p1']){

        this.param1 = params['p1'];
        this.navigate()
      }
      
  });
  // this.isFirstTabVisible = true;
  }
  onTabPanelClick(event: { index: number; }) {
    
    this.isFirstTabVisible= (event.index === 0) ? true : false;
   this.isSecondTabVisible= (event.index === 1) ? true : false;
    this.isThirdTabVisible= (event.index === 2) ? true : false;
   // this.isFouthTabVisible= (event.index === 4) ? true : false;

 }
 hide(){
   
  this.isFirstTabVisible=  false;
  this.isSecondTabVisible=  false;
   this.isThirdTabVisible= false;
   //this.isFouthTabVisible=  false;
    

 }
 
 navigate(){
  this.router.navigate(['page-3'],{relativeTo: this.route,  queryParams: {p2: this.param1}});
}
}
