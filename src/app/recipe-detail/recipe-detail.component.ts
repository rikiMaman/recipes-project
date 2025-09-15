import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/Recipe.Service';
import { Category, Recipe } from '../user/user.component';
import { AuthService } from '../services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  category: Category[] = [];
  ingredientToEmojiIndex: { [key: string]: number } = {
    cupcake: 0,
    cookie: 1,
    Sushi: 2,
    BirthdayCake: 3,
    Shortcake: 4,
    Doughnut: 5,
    Pizza: 6,
    Hamburger: 7,
    Bread: 8,
    Croissant: 9,
    Pretzel: 10,
    Pie: 11,
    Cooking: 12, // יכול לייצג בישול או מרכיב קשור
    SoftIceCream: 13,
    ChocolateBar: 14,
    Candy: 15,
    HoneyPot: 16,
    water: 17,
    Sugar: 18,
    Oil: 19,
    Flour: 20,
    Chocolate: 21,
    Milk: 22

    // ... וכן הלאה ...
  };

  ikons: string[] = ['🧁', '🍪', '🍣', '🎂', '🍰', '🍩', '🍕', '🍔', '🍞', '🥐', '🥨',
    '🥧', '🍳', '🍦', '🍫', '🍬', '🍯', '💧', '🍚',
    '🫒', '🌾', '🍫', '🥛'];
  currentUser: any = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  recipe3: any = JSON.parse(sessionStorage.getItem('currentRecipe') || '{}') ? JSON.parse(sessionStorage.getItem('currentRecipe') || '{}') : 2;
  isCurrentUserOwner: boolean = false;




  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService, private authService: AuthService) {


    if (this.isCurrentUserOwner) {
      console.log(JSON.parse(sessionStorage.getItem('currentUser') || '{}').Id);
      console.log(7);
      console.log(JSON.parse(sessionStorage.getItem('currentRecipe') || '{}').userCode ? JSON.parse(sessionStorage.getItem('recipe') || '{}').userCode : 1)
      console.log("הצג כפתור 'למחיקת המתכון'");
    }
    console.log(this.currentUser.Id === this.recipe3.userCode);


    if (!this.authService.getIsLoggedIn()) {
      console.log(this.authService.getIsLoggedIn());
      // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
      this.router.navigate(['/login']);
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // השתמש במזהה לקבלת המתכון מהשירות
      this.recipeService.getRecipeById(Number(id)).subscribe(recipe => {
        this.recipe = recipe;
        // תיקון הנתיב לתמונות כדי שיעבוד ב-GitHub Pages
        if (this.recipe.imageRoute?.startsWith('src/assets')) {
          this.recipe.imageRoute = this.recipe.imageRoute.replace('src/', '');
        }
        this.isCurrentUserOwner = recipe.userCode === this.currentUser.id
        console.log(this.currentUser);
        console.log(this.recipe.userCode)
        console.log(this.isCurrentUserOwner);
      });
    }
    // r:number=this.recipe?this.recipe.userCode:100
    let r = this.recipe ? this.recipe.userCode : 100
    console.log(this.currentUser.id);
    // console.log(this.recipe);

    // this.isCurrentUserOwner= this.currentUser.Id === this.recipe?.userCode;
  }



  ngOnInit(): void {


    // // קבל את המזהה מה-URL באמצעות ה- ActivatedRoute
    // if (!this.authService.getIsLoggedIn()) {
    //   console.log(this.authService.getIsLoggedIn());
    //   // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
    //   this.router.navigate(['/login']);
    //   return;
    // }
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   // השתמש במזהה לקבלת המתכון מהשירות
    //   this.recipeService.getRecipeById(Number(id)).subscribe(recipe => {
    //     this.recipe = recipe;
    //   });
    // }
    // // r:number=this.recipe?this.recipe.userCode:100
    // let r = this.recipe ? this.recipe.userCode : 100
    // console.log(this.currentUser.Id);
    // console.log(this.recipe?.userCode);

    // this.isCurrentUserOwner= this.currentUser.Id === this.recipe?.userCode;
  }

  displayDifficultyStars(difficultyLevel: number): string {
    let stars = '';
    for (let i = 0; i < difficultyLevel; i++) {
      stars += '★';
    }
    return stars;
  }

  getCategoryIcon(categoryCode: number): string {
    // החזרת אייקון לפי קוד הקטגוריה - לדוגמה:
    switch (categoryCode) {
      case 1:
        return 'birthday-cake';
      case 2:
        return 'utensils';
      case 3:
        return 'leaf';
      default:
        return 'question';
    }
  }

  isCurrentUserRecipeOwner(): boolean {

    return true;
  }

  deleteRecipe() {
    if (confirm('Are you sure you want to delete this recipe?')) {

      this.recipeService.deleteRecipe(this.recipe ? this.recipe.recipeCode : 1000).subscribe(
        () => {
          // מעבר לעמוד הפרטים של המתכון אחרי שמירה
          // this.router.navigate(['/recipe-details', this.recipeId]);
          this.router.navigate(['/all-recipe']);
        },
        (error: any) => {
          console.error('Error updating recipe:', error);
        }
        //   (r: Recipe) =>
        //  {
        //   if(r)
        //   {
        //     alert("success!")
        //     this.router.navigate(['/all-recipe']);

        //   }
        //   else{

        //     //  error => {
        //       // אם המחיקה נכשלה, נציג הודעת שגיאה
        //       console.error('Failed to delete recipe:');
        //       alert('Failed to delete recipe. Please try again later.');
        //     }

        //   }
        // recipe=new Recipe[]
        // אם המחיקה בוצעה בהצלחה, נותרים למשתמש רק לנווט לעמוד הרלוונטי
      );
    }
    this.router.navigate(['/all-recipe']);
  }
}






