import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants';
import { Event } from 'src/app/interfaces/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  // createEvent(event:Event):Observable<Event>{
  //   const url = BASE_URL + 'create_event';
  //   return this.http.post<Event>(url,event);
  // }
  createEvent(formData: FormData): Observable<any> {
    return this.http.post<any>(BASE_URL + 'create_event', formData);
  }

  fetchEvents():Observable<any>{
    const url = BASE_URL + 'get_events';
    return this.http.get<any>(url)
  }

}
