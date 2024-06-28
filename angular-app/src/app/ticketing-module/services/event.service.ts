import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Event } from 'src/app/interfaces/events.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BASE_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private authService:AuthServiceService) { }

  token = this.authService.getToken();

  createEvent(formData: FormData): Observable<any> {
    
    const url = `${BASE_URL}` + 'create_event';

    // Get token from AuthServiceService
    

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    // Make the POST request with headers and formData
    return this.http.post<any>(url, formData, { headers });
  }

  fetchEvents():Observable<any>{
    const url = `${BASE_URL}` + 'get_events';
    return this.http.get<any>(url)
  }

  fetchEventNames(): Observable<string[]> {
    return this.fetchEvents().pipe(
      map(response => {
        // Extract event names from the response
        const eventNames: string[] = response.events.map((event: { name: any; }) => event.name);
        return eventNames;
      })
    );
  }

  deleteEvent(id: any): Observable<any> {
    const url = `${BASE_URL}delete_event/${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.delete<any>(url, { headers });
  }

}
