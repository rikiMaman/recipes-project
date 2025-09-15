import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recipe } from '../user/user.component';
import { RecipeService } from '../services/Recipe.Service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  preparationStepsControl: FormArray;
  static count1: number=9;
  static count2: number=10
  // PreparationSteps: FormGroup;
  recipeId: number=0;
  recipe!: Recipe;
  recipeName: string='';
  categoryCode: number=0;
  categories: { code: number, name: string }[] = [
    { code: 1, name: 'חלבי'},
    { code: 2, name: 'בשרי' },
    { code: 3, name: 'קינוחים' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {
    
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.required],
      categoryCode: ['', Validators.required],
      preparationTimeMinutes:[2],
      difficultyLevel: ['', [Validators.min(1), Validators.max(5)]],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      preparationSteps: this.fb.array([this.fb.control('', Validators.required)]),
      imageRoute:['']
    });
    this.preparationStepsControl = this.recipeForm.get('preparationSteps') as FormArray;
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

  ngOnInit(): void {
    this.preparationStepsControl = this.recipeForm.get('preparationSteps') as FormArray;
    this.preparationStepsControl?.valueChanges.subscribe((value: string[]) => {
      // התנאי הזה יבוצע כל פעם שהערך של preparationSteps משתנה
      console.log(value); // כאן ניתן להשתמש בערך החדש של preparationSteps
    });
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      console.log(this.recipeId)
      // this.recipeId=1;
       this.loadRecipe(this.recipeId);
    });
  }
  ToAllRecipe(): void{
    this.router.navigate(['/all-recipe']);
  }
  loadRecipe(recipeId: number=0): void {
    this.recipeService.getRecipeById(recipeId).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        this.recipeForm.patchValue({
          recipeName: this.recipe.recipeName,
          categoryCode: this.recipe.categoryCode,
          preparationTimeMinutes: this.recipe.preparationTimeMinutes,
          difficultyLevel: this.recipe.difficultyLevel,
          ingredients: this.recipe.ingredients,
          preparationSteps: this.recipe.preparationSteps,
          imageRoute: this.recipe.imageRoute
        });
      },
      (error) => {
        console.error('Error loading recipe:', error);
      }
    );
  }
  saveRecipe(): void {
    if (this.recipeForm.valid) {
      console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}').Id)
      let x= JSON.parse(sessionStorage.getItem('currentUser') || '{}')?
       JSON.parse(sessionStorage.getItem('currentUser') || '{}').Id: 1;
       let a= JSON.parse(sessionStorage.getItem('currentUser') || '{}')
        console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
        this.recipeForm.value.ingredients = this.recipeForm.value.ingredients.filter((ingredient: string) => ingredient.trim() !== '');
        this.recipeForm.value.preparationSteps = this.recipeForm.value.preparationSteps.filter((step: string) => step.trim() !== '');
      // לוגיקה לשמירת המתכון
      const editedRecipe: Recipe = {
        recipeCode: EditRecipeComponent.count1,
        recipeName: this.recipeForm.value.recipeName,
        categoryCode: this.recipeForm.value.categoryCode,
        preparationTimeMinutes: this.recipeForm.value.preparationTimeMinutes,
        difficultyLevel: this.recipeForm.value.difficultyLevel,
        dateAdded: new Date(),
        ingredients: this.recipeForm.value.ingredients,
        preparationSteps: this.recipeForm.value.preparationSteps,
        userCode: x,
        imageRoute: this.recipeForm.value.imageRoute
      };
      EditRecipeComponent.count1+=1;
      console.log(EditRecipeComponent.count1);
      this.recipeService.updateRecipe(this.recipeId, editedRecipe).subscribe(
        () => {
          console.log('Recipe updated successfully');
          Swal.fire('!המתכון עודכן בהצלחה', '', 'success').then(() => {
            this.router.navigate(['/recipe-detail',this.recipeId]);
          });
          // מעבר לעמוד הפרטים של המתכון אחרי שמירה
          // this.router.navigate(['/recipe-details', this.recipeId]);
          // this.router.navigate(['/recipe-detail', this.recipeId]);
        },
        (error: any) => {
          console.error('Error updating recipe:', error);
        }
      );
      
    }
    else{
      Swal.fire('שגיאה', 'חובה למלא: שם מתכון, מרכיבים, הוראות הכנה וקטגוריה', 'error');


    }

  }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addIngredient() {
    this.ingredients.push(this.fb.control(''));
    // אוטומטית מוסיף תיבת קלט ריקה כאשר המשתמש מתחיל להקליד בשדה האחרון
    const ingredientsControls = this.ingredients.controls;
    if (ingredientsControls[ingredientsControls.length - 1].value !== '') {
      this.ingredients.push(this.fb.control('', Validators.required));
    }
  }
  cancel(): void {
    // לוגיקה לביטול העריכה וחזרה לעמוד הקודם
    // מעבר לעמוד הפרטים של המתכון במקרה של ביטול
    this.router.navigate(['/recipe-details', this.recipeId]);
  }
//   addStepIfLast(event: Event, index: number) {
//     const inputElement = event.target as HTMLInputElement;
//     const value = inputElement.value.trim();
//     const lastIndex = this.preparationStepsControl.controls.length - 1;
//     if (index === lastIndex && value !== '') {
//       this.addStep('');
//     }
// }


addStep() {
  this.preparationSteps.push(this.fb.control(''));
// אוטומטית מוסיף תיבת קלט ריקה כאשר המשתמש מתחיל להקליד בשדה האחרון
const stepsControls = this.preparationSteps.controls;
if (stepsControls[stepsControls.length - 1].value !== '') {
  this.preparationSteps.push(this.fb.control('', Validators.required));
}
}
get preparationSteps() {
  return this.recipeForm.get('preparationSteps') as FormArray;
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


}
