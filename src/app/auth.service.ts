import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  isLoggedIn!:Boolean;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'

    })
  }

  constructor(private http: HttpClient,) { }
  collectionsExists(){
    return this.http.get("http://localhost:3000/createUsers",{responseType: 'text'})
  }
  loginhttp(credentials: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/app/login", credentials, this.httpOptions)

  };

  getAuthorizationToken():string|null {

    return localStorage.getItem('token');
  }


  // store the URL so we can redirect after logging in
  redirectUrl!: string | null ;
  
  
  login(): boolean {
    
    return (localStorage.getItem('user') !== null) ;
  }


  
  addIssues(jsonobj:any):Observable<any>{
    return this.http.post<any>("http://localhost:3000/private/reporter/addIssues", jsonobj, this.httpOptions)
    
  }

getIssues():Observable<any>{
  return this.http.get<any>("http://localhost:3000/public/publicIssues")
}

filterIssueByStatus(status:string):Observable<any>{
  return this.http.get("http://localhost:3000/public/filerIssuesStatus/"+status,this.httpOptions)
}
filterIssueByReporter(reporter:string):Observable<any>{
  return this.http.get("http://localhost:3000/public/filerIssuesRep/"+reporter,this.httpOptions)
}
filterIssueByType(type:string):Observable<any>{
  return this.http.get("http://localhost:3000/public/filerIssuesType/"+type,this.httpOptions)
}
filterIssueByDeveloper(developer:string):Observable<any>{
  return this.http.get("http://localhost:3000/public/filerIssuesDev/"+developer,this.httpOptions)
}
updateIssueByReporter(id:number,obj:{}):Observable<any>{
return this.http.put("http://localhost:3000/private/reporter/updateIssues/"+id,obj,this.httpOptions)
}
listIssuesDev():Observable<any>{
return this.http.get("http://localhost:3000/private/developer/listIssuesDev",this.httpOptions)
}
updateStatusByDev(obj:{}):Observable<any>{
  return this.http.put("http://localhost:3000/private/developer/updateStatus",obj,this.httpOptions)
}
}



