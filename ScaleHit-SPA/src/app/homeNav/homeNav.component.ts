import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-homeNav',
  templateUrl: './homeNav.component.html',
  styleUrls: ['./homeNav.component.css']
})
export class HomeNavComponent implements OnInit {
  @Output() showRegister = new EventEmitter();
  @Output() showLogin = new EventEmitter();
  selectedLang = 'he-il';

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log('reg');
    this.showRegister.emit(true);
  }

  login() {
    this.showLogin.emit(true);
  }

}
