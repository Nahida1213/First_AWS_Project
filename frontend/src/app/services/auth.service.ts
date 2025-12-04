import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   serverUrl =environment.API_URL;
   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient,private router:Router) { }

   login(email:string,password:string) {
    const credentials={
        email:email,
        password:password}
    return this.http.post(`${this.serverUrl}/auth/login`,credentials);
  }

   logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
   this.router.navigate(['/login'])
    
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

    register(userData: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/auth/register`, userData);
  }

}


 