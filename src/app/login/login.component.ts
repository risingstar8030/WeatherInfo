import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService,
               private router : Router) { }

  ngOnInit(): void {
  }

  user = {
    email: '',
    password: ''
  }


  login(form){
    
    this.authService.login(this.user)
    .subscribe(
      (data : any)=>{
        if(data.success){
          let user = data.user;
          let token = data.token
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token',token)
          console.log(data)
          this.router.navigateByUrl('/user');
        }
      },
      err => console.log(err)
    )

    form.resetForm()
  }
}
