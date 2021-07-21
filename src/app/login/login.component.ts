import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  red = "red";
  bgcolor = "#DCDCDC";
  inner = "";
  @Output()
  bool_login = new EventEmitter<any>();

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  }, [Validators.required]);

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.collectionsExists().subscribe(post=>post);
  }


  login() {


    

      if (this.auth.login()) {


        const redirectUrl = '/container';

        // Redirect the user
        this.router.navigate([redirectUrl]);

        //this.bool_login.emit(true);
      }
    
  }
  onSubmit() {
    if (!this.form.valid) {
      this.inner = "complete the fields"
    }else {
          this.loading = true;
          this.auth.loginhttp(this.form.value).subscribe(post => {
            if (post.access_token) {
            
            
              localStorage.setItem('user',this.form.value.username  )
              localStorage.setItem("token",post.access_token)
              this.login()
            } else {
              this.loading = false;
              this.inner = post.message;
            }

          })
        }
      


    }




  }

