import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  constructor(private httpClient: HttpClient) { }

  registerUser(userDetails: any) {
    return this.httpClient.post<any>(`${BASE_URL}register`, userDetails);
  }

  loginUser(userDetails:any){
    return this.httpClient.post<any>(`${BASE_URL}login`, userDetails);
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Retrieving the token from localStorage
  }

  verifyUser(id: string) {
    return this.httpClient.get(`${BASE_URL}verify/${id}`);
  }

  fetchUser(){
    
    const url = `${BASE_URL}` + 'fetch_user';

    // Get token from AuthServiceService
    const token = this.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json' // Adjust content type as needed
    });

    // Make the POST request with headers and orgDetails
    return this.httpClient.get<any>(url, { headers });
  }

  logoutUser() {
    const url = `${BASE_URL}logout`;

    // Get token from AuthServiceService
    const token = this.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    // Make the POST request with headers
    return this.httpClient.post<any>(url, {}, { headers }).pipe(
      catchError(error => {
        return throwError(error); // Forward the error to the caller
      })
    );
  }

 
  submitEmail(userDetails:any){
    return this.httpClient.post<any>(`${BASE_URL}marketing_email`, userDetails);
  }

  forgetPassword(userDetails:any){
    return this.httpClient.post<any>(`${BASE_URL}forgot-password`, userDetails);
  }

}
