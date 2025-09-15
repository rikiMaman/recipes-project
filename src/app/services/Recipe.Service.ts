import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user.component';

import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
    private apiUrl='https://localhost:7279/api/Recipe';
    constructor(private _http: HttpClient) {
    }
    getRecipesList(): Observable<Recipe[]> {
      return this._http.get<Recipe[]>('https://localhost:7279/api/Recipe')
    }
  
    getRecipeById(id: number): Observable<Recipe> {
      return this._http.get<Recipe>(`https://localhost:7279/api/Recipe/${id}`)
    }
  
    addRecipe(recipe: Recipe) {
      return this._http.post('https://localhost:7279/api/Recipe', recipe)
    }
    updateRecipe(recipeId: number, updatedRecipe: Recipe): Observable<void> {
      const url = `${this.apiUrl}/${recipeId}`; // הוסף את הנתיב לעדכון מתכון ספציפי
      return this._http.put<void>(`https://localhost:7279/api/Recipe/${recipeId}`, updatedRecipe);
    }
    deleteRecipe(id: number): Observable<void> {
      return this._http.delete<void>(`https://localhost:7279/api/Recipe/${id}`);
    }

    
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  [x: string]: any;

  constructor(private _http: HttpClient) {
  }
  
  getUserList(): Observable<User[]> {
    return this._http.get<User[]>('https://localhost:7279/api/User')
  }

  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`https://localhost:7279/api/User/${id}`)
  }

  addUser(usaer: User) {
    return this._http.post('https://localhost:7279/api/User', usaer)
  }
  // isExist(name: string): Observable<boolean>{
  //   return this._http.get<boolean>(`https://localhost:7279/api/User/`);
  // }
  checkUserExists(name: string): Observable<User>{
    return this._http.get<User>(`https://localhost:7279/api/User/${name}`);
  }

  
  // sExist(name: string): Observable<boolean>{
  //   return this._http.get<boolean>(`https://localhost:7279/api/User/`);
  // }
  // authenticateUser(name: string, password: string): Observable<User>{
  //   const params = { name, password };
  //   return this._http.get<User>(`https://localhost:7279/api/User/byCredentials/{username}/{password}`);
  // }
  authenticateUser(username: string, password: string): Observable<User> {
    return this._http.get<User>(`https://localhost:7279/api/User/byCredentials/${username}/${password}`);
  }


  

  



}