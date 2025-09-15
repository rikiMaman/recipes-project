import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() { }

  // פונקציה זו מקבלת משתנה שמציין אם המשתמש מחובר או לא
  public setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  // פונקציה זו מחזירה את מצב ההתחברות הנוכחי של המשתמש
  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
