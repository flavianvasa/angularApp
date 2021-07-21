import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  myfunction(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
this.router.navigate(['/login'])
  
}
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  

}
