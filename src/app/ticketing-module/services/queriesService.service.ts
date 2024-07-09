import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
 

  constructor(private http: HttpClient, private $authServ : AuthServiceService) { }

  

  createQuery(queryData: any): Observable<any> {

    const token = this.$authServ.getToken();

    const url = `${BASE_URL}` + 'create_query';

    // Get token from AuthServiceService
    

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    // Make the POST request with headers and formData
    return this.http.post<any>(url, queryData, { headers });
   
  }

  fetchQueries():Observable<any>{
    // Prepare headers with Authorization Bearer token
    const token = this.$authServ.getToken();
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
  
      // Make the POST request with headers
      return this.http.get<any>(`${BASE_URL}fetch_queries`,  { headers });
  }

  

}
