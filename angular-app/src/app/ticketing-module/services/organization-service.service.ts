import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationServiceService {

  constructor(private httpClient:HttpClient) { }

  createOrganization(orgDetails: any) {
    return this.httpClient.post<any>('http://127.0.0.1:8000/api/createOrganization', orgDetails);
  }
}
