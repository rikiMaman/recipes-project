import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router : Router){}


  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  goToRegister(): void {
    this.Register();
  }
  Register(): void{
    this.router.navigate(['/register']);

  }

}
