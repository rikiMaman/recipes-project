import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {Route, RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { UserService } from './services/Recipe.Service';
import { HomeComponent } from './home/home.component';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { HoursAndMinutesPipe } from '../app/hours-and-minutes.pipe';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthInterceptor } from './auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { LogOutComponent } from './log-out/log-out.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
// import { UserServiceComponent } from './user-service/user-service.component';
const routers : Route[]= [
  {path:"", redirectTo:"all-recipe", pathMatch: "full"},
  {path: "navbar", component: NavbarComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "user", component: UserComponent},
  {path: "all-recipe", component: AllRecipesComponent},
  {path: "home", component: HomeComponent},
  {path: "recipe-detail", component: RecipeDetailComponent},
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  {path: 'add-recipe', component: AddRecipeComponent},
  {path:'log-out', component: LogOutComponent},
  { path: 'recipe-details/:id', component: EditRecipeComponent },
  
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    AllRecipesComponent,
    HomeComponent,
    SmallRecipeComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    HoursAndMinutesPipe,
    NavbarComponent,
    LogOutComponent,
    EditRecipeComponent
    // RecipeDetailComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers)
  ],
  providers: [UserService],
    
   
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
