import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-mainNav',
  templateUrl: './mainNav.component.html',
  styleUrls: ['./mainNav.component.css'],
})

export class MainNavComponent implements OnInit {
  selectedLang = 'he-il';
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
