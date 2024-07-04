import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BASE_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class OrganizationServiceService {

  constructor(private httpClient:HttpClient, private authService:AuthServiceService) { }

  createOrganization(orgDetails: any): Observable<any> {
   
    const url = `${BASE_URL}`+ 'createOrganization';

    // Get token from AuthServiceService
    const token = this.authService.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json' // Adjust content type as needed
    });

    // Make the POST request with headers and orgDetails
    return this.httpClient.post<any>(url, orgDetails, { headers });
  }

  createSingleAccount():Observable<any>{
    
    const url = `${BASE_URL}` + 'create_single_account';

    // Get token from AuthServiceService
    const token = this.authService.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json' // Adjust content type as needed
    });

    // Make the POST request with headers and orgDetails
    return this.httpClient.post<any>(url,{}, { headers });
  }
}
