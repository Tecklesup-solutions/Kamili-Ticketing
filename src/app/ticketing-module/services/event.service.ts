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

 

  createEvent(formData: FormData): Observable<any> {
    
    const url = `${BASE_URL}` + 'create_event';

    const token = this.authService.getToken();

    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    // Make the POST request with headers and formData
    return this.http.post<any>(url, formData, { headers });
  }

  fetchEvents():Observable<any>{
    const url = `${BASE_URL}` + 'get_events';
    return this.http.get<any>(url)
  }



  fetchPublicEvents(page: number): Observable<any> {
    const url = `${BASE_URL}get_events?page=${page}&per_page=6`; 
    return this.http.get<any>(url);
  }

 


  fetchSingleEvent(id:any):Observable<any>{
    const url = BASE_URL + `fetchSingleEvent/${id}`;
    return this.http.get<any>(url)
  }  

  fetchOrgEvents():Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      });
  
      return this.http.get<any>(`${BASE_URL}get_org_events`,  { headers });
  }
  

  fetchEventCategories():Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      });
  
      return this.http.get<any>(`${BASE_URL}categories`,  { headers });
  }

  fetchEventNames(): Observable<string[]> {
    return this.fetchOrgEvents().pipe(
      map(response => {
        // Extract event names from the response
        const eventNames: string[] = response.events.map((event: { name: any; }) => event.name);
        return eventNames;
      })
    );
  }

  deleteEvent(id: any): Observable<any> {
    const token = this.authService.getToken();
    const url = `${BASE_URL}delete_event/${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.delete<any>(url, { headers });
  }

  updateEvent(eventId: number, formData: FormData): Observable<any> {
    const url = `${BASE_URL}update_event/${eventId}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    // Use POST instead of PUT
    return this.http.post<any>(url, formData, { headers });
  }
  

  purchaseTickets(eventId: number, ticketDetails: any): Observable<any> {
    const url = `${BASE_URL}buyTicket/${eventId}`;
    return this.http.post<any>(url, ticketDetails);
  }

  fetchEventUsers(id:any):Observable<any>{
    const url = BASE_URL + `fetchEventUsers/${id}`;
    return this.http.get<any>(url)
  }

}
