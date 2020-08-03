import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  user : any;

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/')
  }

  getUser(){

     this.user = JSON.parse(localStorage.getItem('user'));
  }


}
