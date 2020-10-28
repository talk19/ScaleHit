import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainNav',
  templateUrl: './mainNav.component.html',
  styleUrls: ['./mainNav.component.css']
})
export class MainNavComponent implements OnInit {
  selectedLang = 'he-il';
  userMsg = 'hello';
  constructor() { }

  ngOnInit() {
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('loged out');
  }

}
