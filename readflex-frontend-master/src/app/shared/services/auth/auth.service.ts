import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userBaseUrl = environment.baseUrl + '/users';
  isUserLogged$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    localStorage.setItem('isUserLogged', 'true');
    return this.http.post<any>(this.userBaseUrl + '/login', loginData);
  }
}
