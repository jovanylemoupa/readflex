import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userBaseUrl = environment.baseUrl;
  isUserLogged$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    console.log('connexion', loginData);
    return this.http.post(`${this.userBaseUrl}/auth/login`, loginData);
  }

  LoginOut() {
    console.log('Déconnexion');
    return this.http.post(`${this.userBaseUrl}/auth/logout`, null);
  }
}
