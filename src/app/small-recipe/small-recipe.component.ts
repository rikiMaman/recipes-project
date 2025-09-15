
import { Component, Input, OnInit } from '@angular/core';
import { Category, Recipe } from '../user/user.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrls: ['./small-recipe.component.css']
})
export class SmallRecipeComponent implements OnInit {
  @Input() recipe!: Recipe;
  picture :string='';
  categories: Category[]=[];
  category1: Category={
    code:1,
    name:'חלבי',
    iconRoute:'assets/chocolate-cookies-with-chocolate-chips.jpg'
  };
  category2: Category={
    code:2,
    name:'בשרי',
    iconRoute:'assets/vertical-view-vegan-tofu-pancakes-with-fruits-white-plate.jpg'
  };
  category3: Category={
    code:3,
    name:'קינוחים',
    iconRoute:'assets/chocolate-cookies-with-chocolate-chips.jpg'
  };

  constructor(private router: Router) {
    if(this.recipe?.categoryCode==1){
      this.picture= this.category1.iconRoute;

    }
    else if (this.recipe?.categoryCode==2) {
      this.picture= this.category2.iconRoute;
    }
    else if (this.recipe?.categoryCode==3) {
      this.picture= this.category3.iconRoute;
    }
    else{
      this.picture= this.category2.iconRoute;
    }
    
  }
  ngOnInit(): void {
    this.categories = [
      new Category(0, 'desserts', '🧁'),
      new Category(1, 'cakes & cookies', '🍩'),
      new Category(2, 'health', '🥗'),
      new Category(3, 'fish', '🍴'),
      new Category(4, 'soup', '🍟'),
    ]
  }

  redirectToRecipeDetails(): void {
    this.router.navigate(['/recipe-detail', this.recipe.recipeCode]);
  }
  redirectToRecipeEdit():void{
    this.router.navigate(['/recipe-details', this.recipe.recipeCode]);
  }

}
