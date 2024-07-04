import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
 

  constructor(private http:HttpClient, private $authServ :AuthServiceService) { }

  fetchEvents():Observable<any>{
    const url = BASE_URL + 'get_events';
    return this.http.get<any>(url)
  }


  

  fetchEventNames(){
    
  }


  fetchSingleEvent(id:any):Observable<any>{
    const url = BASE_URL + `fetchSingleEvent/${id}`;
    return this.http.get<any>(url)
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
