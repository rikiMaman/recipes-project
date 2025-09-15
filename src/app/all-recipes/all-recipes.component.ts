import { Component, OnInit } from '@angular/core';
import { Recipe } from '../user/user.component';
import {RecipeService} from '../services/Recipe.Service'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  filterName: string = '';
  filterCategory: number =0;
  filterPreparationTime: number | null = null;
  categories: { code: number, name: string }[] = [
    {code: 1, name: 'חלבי'},
    { code: 2, name: 'בשרי' },
    { code: 3, name: 'קינוחים' },
    // הוספת קטגוריות נוספות כרצונך
  ];
  public selectedProductToShow!: Recipe
  constructor(private recipeService: RecipeService, private router: Router){
    this.recipeService.getRecipesList().subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  ngOnInit(): void {
    this.recipeService.getRecipesList().subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.applyFilters();
    });
   
  }

  applyFilters(): void {
    console.log(this.filterName)
    console.log(this.filterCategory)
    console.log(this.filterPreparationTime)
    this.filteredRecipes = this.recipes.filter(recipe =>
      (recipe.recipeName.toLowerCase().includes(this.filterName.toLowerCase()) || this.filterName === '') &&
      (this.filterCategory === null || recipe.categoryCode == this.filterCategory || this.filterCategory==0) &&
      (this.filterPreparationTime === null || recipe.preparationTimeMinutes <= this.filterPreparationTime)
    );
    console.log(this.filteredRecipes);
  }

  // קריאה לפונקציה כאשר יש שינוי בערך של אחד משדות הסינון
  onFilterChange(): void {
    this.applyFilters();
  }
}
