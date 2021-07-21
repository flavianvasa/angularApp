import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { ContainerComponent } from './container/container.component';
import { IssuesComponent } from './issues/issues.component';
import { LoginComponent } from './login/login.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { PageWithSubpagesComponent } from './page-with-subpages/page-with-subpages.component';

const routes: Routes = [
  {
path:'',redirectTo:'/login',pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent

  },
  
    
    {
      path:'container',
      component:ContainerComponent,
      canActivate:[AuthGuardService],
     canActivateChild:[AuthGuardService],
      children:[
        
          {
            path:"issues",
            component:IssuesComponent
              },
          {
            path:'page-with-subpages',
            component:PageWithSubpagesComponent,
            canActivateChild:[AuthGuardService],
            children:[
              
              
                {
                  path:'page-1',
                  component:PageOneComponent
                },
                {
                  path:'page-2',
                  component:PageTwoComponent
                },
                {
                  path:'page-3',
                  component:PageThreeComponent
                },
                {
                  path:'page-3?p2',
                  component:PageThreeComponent
                }
        
              
            
              
            ]
          }
          
        
        
        
      ]
    },
  
  //  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
