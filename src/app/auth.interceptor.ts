import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // Get the auth token from the service.
     const authToken = this.auth.getAuthorizationToken();

     // Clone the request and replace the original headers with
     // cloned headers, updated with the authorization.
     const authReq = req.clone({
       headers: req.headers.set('Authorization','Bearer ' + authToken)
     });
 
     // send cloned request with header to the next handler.
     return next.handle(authReq);
    
  }

}
