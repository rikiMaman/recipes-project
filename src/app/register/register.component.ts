import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/Recipe.Service';
import { User } from '../user/user.component';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@NgModule({
  providers: [
    AuthService
  ]
})
export class AuthModule { }


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User[] = [];
  username: string = '';
  adress: string = '';
  mail: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  userList: User[]=[];
  private _authService: AuthService;
  constructor(private _userService: UserService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) {
    this._authService= authService;
    
   }
  ngOnInit(): void {

    this._userService.getUserList().subscribe({
      next: (res : any) => {
        this.userList= res
        // console.log(this.userList)
      },
      error: (err : any) =>{
        console.log(err);
      }
    })
    this.route.queryParams.subscribe(params => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }



  displayAllRecipe(): void {
    console.log('Submitting form');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // בדיקה אם המשתמש קיים

    this._userService.authenticateUser(this.username? this.username:'user', this.password? this.password:'999').subscribe(
      (authenticated: User) => {
        if (authenticated) {
          console.log
          alert("המשתמש קיים כבר במערכת");
        }
        else{
          const newUser: User = {
            Name: this.username? this.username:'user',
            Adress: this.adress,
            Email: this.mail,
            Password: this.password? this.password:'999',
            Id: 0
          };
          this._userService.addUser(newUser).subscribe({
            next: (res: any) => {
              this.user = res
            },
            error: (err: any) => {
              console.log(err);
            },
          });
          sessionStorage.setItem('currentUser', JSON.stringify(newUser));
          this._authService.setIsLoggedIn(true);
          console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
      
          this.goToAllRecipe();
        }
        
      })
   
   
  }
  goToAllRecipe(): void {
    this.router.navigate(['/all-recipe']);

  }
}
