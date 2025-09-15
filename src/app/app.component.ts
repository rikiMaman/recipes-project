import { Component } from '@angular/core';
import {UserComponent} from  '../app/user/user.component'
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalProject';
}
