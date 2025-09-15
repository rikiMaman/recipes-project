import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../services/Recipe.Service';
import Swal from 'sweetalert2';
import { Recipe } from '../user/user.component';
import { Router } from '@angular/router';
import { defaultIfEmpty } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  static count1: number=9;
  static count2: number=8;
  recipes: Recipe[] = [];
  recipeForm: FormGroup;
  categoryCode: number=0;
  categories: { code: number, name: string }[] = [
    { code: 1, name: 'חלבי'},
    { code: 2, name: 'בשרי' },
    { code: 3, name: 'קינוחים' },
  ];

  // categories = ['קטגוריה 1', 'קטגוריה 2', 'קטגוריה 3']; // ניתן לשנות לפי קטגוריות המתכונים שלך

  constructor(private fb: FormBuilder, private router: Router, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.required],
      categoryCode: ['', Validators.required],
      preparationTimeMinutes: [30],
      difficultyLevel: [2],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      preparationSteps: this.fb.array([this.fb.control('', Validators.required)]),
      imageRoute: ['']
      //add image route
    });
    this.ingredients.valueChanges.subscribe(values => this.manageIngredients(values));
    this.preparationSteps.valueChanges.subscribe(values => this.managePreparationSteps(values));
  }
  manageIngredients(values: string[]) {
    if (values[values.length - 1]) {
      this.addIngredient();
    } else if (!values[values.length - 1] && values.length > 1) {
      this.removeIngredient(values.length - 1);
    }
  }


  managePreparationSteps(values: string[]) {
    if (values[values.length - 1]) {
      this.addStep();
    } else if (!values[values.length - 1] && values.length > 1) {
      this.removeStep(values.length - 1);
    }
  }


  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparationSteps() {
    return this.recipeForm.get('preparationSteps') as FormArray;
  }

  



  addIngredient() {
    this.ingredients.push(this.fb.control(''));
    // אוטומטית מוסיף תיבת קלט ריקה כאשר המשתמש מתחיל להקליד בשדה האחרון
    const ingredientsControls = this.ingredients.controls;
    if (ingredientsControls[ingredientsControls.length - 1].value !== '') {
      this.ingredients.push(this.fb.control('', Validators.required));
    }
  }

  addStep() {
    this.preparationSteps.push(this.fb.control(''));
  // אוטומטית מוסיף תיבת קלט ריקה כאשר המשתמש מתחיל להקליד בשדה האחרון
  const stepsControls = this.preparationSteps.controls;
  if (stepsControls[stepsControls.length - 1].value !== '') {
    this.preparationSteps.push(this.fb.control('', Validators.required));
  }
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  removeStep(index: number) {
    if (this.preparationSteps.length > 1) {
      this.preparationSteps.removeAt(index);
    }
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      let a= JSON.parse(sessionStorage.getItem('currentUser') || '{}')
      console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
      this.recipeForm.value.ingredients = this.recipeForm.value.ingredients.filter((ingredient: string) => ingredient.trim() !== '');
      this.recipeForm.value.preparationSteps = this.recipeForm.value.preparationSteps.filter((step: string) => step.trim() !== '');

      const newRecipe: Recipe = {
        recipeCode: AddRecipeComponent.count1++,
        recipeName: this.recipeForm.value.recipeName,
        categoryCode: this.recipeForm.value.categoryCode,
        preparationTimeMinutes: this.recipeForm.value.preparationTimeMinutes,
        difficultyLevel: this.recipeForm.value.difficultyLevel,
        dateAdded: new Date(),
        ingredients: this.recipeForm.value.ingredients,
        preparationSteps: this.recipeForm.value.preparationSteps,
        userCode: a.id,
        imageRoute: this.recipeForm.value.imageRoute
      };
      // AddRecipeComponent.count1 += 1;
      // AddRecipeComponent.count2 += 1;

      this.recipeService.addRecipe(newRecipe).subscribe({
        next: (res: any) => {
          this.recipes = res
        },
        error: (err: any) => {
          console.log(err);
        },
      });
      sessionStorage.setItem('currentRecipe', JSON.stringify(newRecipe));
      console.log(JSON.parse(sessionStorage.getItem('currentRecipe') || '{}').userCode);
      Swal.fire('המתכון נוסף בהצלחה', '', 'success').then(() => {
        this.router.navigate(['/all-recipe']);
      });
    }
    else {
            Swal.fire('שגיאה', 'חובה למלאות שם מתכון, מרכיבים, הוראות הכנה וקטגוריה', 'error');
          }



    //      
    //       };
    //       console.log(newRecipe2);
    //       AddRecipeComponent.id+=1
    //       this._recipeService.addRecipe(newRecipe2).subscribe({
    //         next: (res: any) => {
    //           this.recipes = res
    //         },
    //         error: (err: any) => {
    //           console.log(err);
    //         },
    //       });
    //       sessionStorage.setItem('currentRecipe', JSON.stringify(newRecipe));
    //       console.log(JSON.parse(sessionStorage.getItem('currentRecipe') || '{}').userCode);
    //       Swal.fire('המתכון נוסף בהצלחה', '', 'success').then(() => {
    //         this.router.navigate(['/all-recipe']);
    //       });
    //     } else {
    //       Swal.fire('שגיאה', 'חובה למלאות שם מתכון, מרכיבים, הוראות הכנה וקטגוריה', 'error');
    //     }




    // this.recipeService.addRecipe(this.recipeForm.value).subscribe(() => {
    //   Swal.fire('המתכון נוסף בהצלחה', '', 'success').then(() => {
    //     // ניווט לדף allRecipes
    //   });
    // });
  }
}



