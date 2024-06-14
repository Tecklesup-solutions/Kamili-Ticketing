import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  constructor(private httpClient: HttpClient) { }

  registerUser(userDetails: any) {
    return this.httpClient.post<any>('http://127.0.0.1:8000/api/register', userDetails);
  }

  loginUser(userDetails:any){
    return this.httpClient.post<any>('http://127.0.0.1:8000/api/login', userDetails);
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Retrieving the token from localStorage
  }

  verifyUser(id: string) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/verify/${id}`);
  }


}
