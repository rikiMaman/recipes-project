import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { User } from '../user/user.component';
import { UserService } from '../services/Recipe.Service';
import { AuthService } from '../services/auth.service';
@NgModule({
  providers: [
    AuthService
  ]
})
export class AuthModule { }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userList: User[] = [];
  username: string = '';
  password: string = '';
  error: string = '';
  private _authService: AuthService;
  constructor(private _userService: UserService, private router: Router, private authService: AuthService) {
    this._authService = authService;
  }
  ngOnInit(): void {
    this._userService.getUserList().subscribe({
      next: (res: any) => {
        this.userList = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  login(): void {
    console.log(this._authService.getIsLoggedIn())
  }
  onSubmit() {
    console.log('Submitting form');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // בדיקה אם המשתמש קיים
    this._userService.checkUserExists(this.username).subscribe(
      (user: User) => {
        if (user) {
          //בדיקה אם גם הסיסמא שהכניז זהה לזו שכתובה שבשרת עם השם משתמש שלו
          this._userService.authenticateUser(this.username? this.username:'user', this.password? this.password:'999').subscribe(
            (authenticated: User) => {
              if (authenticated) {
                console.log
                this._authService.setIsLoggedIn(true);
                sessionStorage.setItem('currentUser', JSON.stringify(authenticated));
                console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
              
                // אם המשתמש קיים והסיסמה נכונה, מעבירים אותו לדף הראשי
                this.router.navigate(['/all-recipe']);
              }
              else{
                alert("אתה רשום! אבל הסימא שהכנסת שגויה");
              }
            })
        }
        else {
          // אם המשתמש לא קיים או הסיסמה שגויה, הצג הודעה מתאימה
          this.error = 'המשתמש לא קיים';
          this.router.navigate(['/register'], { queryParams: { username: this.username } });

          // this.router.navigate(['/register']); // דוגמה לנתיב
        }
      }
    );
  }
}