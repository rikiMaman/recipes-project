import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  private _authService;
  constructor(private authService: AuthService, private _router: Router){
    this._authService=authService;
  }
  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
    sessionStorage.setItem('currentUser', JSON.stringify(''));
    console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
    this._authService.setIsLoggedIn(false);
    this._router.navigate(['/login']);
  }
}
