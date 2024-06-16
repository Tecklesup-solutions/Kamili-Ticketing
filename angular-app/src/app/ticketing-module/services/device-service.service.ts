import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { }
   token = this.authService.getToken();
  createDevice(deviceDetails: any) {
    
    
    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });

    // Make the POST request with headers
    return this.httpClient.post<any>('http://127.0.0.1:8000/api/create_device', deviceDetails, { headers });
  }

  fetchDevice():Observable<any>{    
    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });

    // Make the POST request with headers
    return this.httpClient.get<any>('http://127.0.0.1:8000/api/fetch_devices',  { headers });
  }
}
