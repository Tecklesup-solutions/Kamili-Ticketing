import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BASE_URL } from 'src/app/constants';

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
    return this.httpClient.post<any>(`${BASE_URL}create_device`, deviceDetails, { headers });
  }

  fetchDevice():Observable<any>{    
    // Prepare headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });

    // Make the POST request with headers
    return this.httpClient.get<any>(`${BASE_URL}fetch_devices`,  { headers });
  }
}
