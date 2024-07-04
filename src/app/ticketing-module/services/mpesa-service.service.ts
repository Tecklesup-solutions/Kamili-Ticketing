import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MpesaServiceService {

  constructor(private httpClient:HttpClient, private authService:AuthServiceService) { }

  
  createMpesaCreds(formData: FormData):Observable<any>{
    
    const url = `${BASE_URL}` + 'create_mpesa_creds';

    // Get token from AuthServiceService
    const token = this.authService.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json' // Adjust content type as needed
    });
    // Make the POST request with headers and orgDetails
    return this.httpClient.post<any>(url,formData, { headers });
  }

  fetchMpesaCreds():Observable<any>{
    const url = `${BASE_URL}` + 'fetch_mpesa_creds';

      // Get token from AuthServiceService
      const token = this.authService.getToken();

      // Prepare headers with Authorization Bearer token
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json' // Adjust content type as needed
      });
    return this.httpClient.get<any>(url, {headers})
  }
}
