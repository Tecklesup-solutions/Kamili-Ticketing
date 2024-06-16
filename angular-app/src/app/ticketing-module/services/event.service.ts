import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants';
import { Event } from 'src/app/interfaces/events.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private authService:AuthServiceService) { }

  createEvent(formData: FormData): Observable<any> {
    const BASE_URL = 'http://127.0.0.1:8000/api/'; // Replace with your API base URL
    const url = BASE_URL + 'create_event';

    // Get token from AuthServiceService
    const token = this.authService.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    // Make the POST request with headers and formData
    return this.http.post<any>(url, formData, { headers });
  }

  fetchEvents():Observable<any>{
    const url = BASE_URL + 'get_events';
    return this.http.get<any>(url)
  }

}
