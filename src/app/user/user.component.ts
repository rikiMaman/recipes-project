import { Component } from '@angular/core';
// import { UserService } from '';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // public users: any[];

  // constructor(private userService: UserService) {
  //   this.users = this.userService.getUsers();
  // }
}
// user.model.ts
export class User {
  constructor(
    public Id: number,
    public Name: string,
    public Adress: string,
    public Email: string,
    public Password: string
  ) {}
}

// // category.model.ts
export class Category {
  constructor(
    public code: number,
    public name: string,
    public iconRoute: string
  ) {}
}

// // recipe.model.ts
export class Recipe {
  constructor(
    public recipeCode: number,
    public recipeName: string,
    public categoryCode: number,
    public preparationTimeMinutes: number,
    public difficultyLevel: number,
    public dateAdded: Date,
    public ingredients: string[],
    public preparationSteps: string[],
    public userCode: number,
    public imageRoute: string= ''
  ) {}
}