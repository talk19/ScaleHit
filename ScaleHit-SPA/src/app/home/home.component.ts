import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  loginMode = false;
  constructor() { }

  ngOnInit() {
  }

  showRegisterMode(regMode) {
    console.log(regMode);
    this.registerMode = regMode;
  }

  showLoginMode(logMode) {
    this.loginMode = logMode;
  }

}
