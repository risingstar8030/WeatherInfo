import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }


  register(form) {


    this.authService.register(this.user)
      .subscribe(
        (data: any) => {
          if (data.success) {
            alert(data.msg)
            this.router.navigateByUrl('/')
          }
          else {
            alert(data.msg)
          }
        },
        err => console.log(err)
      )

    form.resetForm();
  }




}
