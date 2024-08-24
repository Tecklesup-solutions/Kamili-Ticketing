// view-devices.component.ts

import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device-service.service';

@Component({
  selector: 'app-view-devices',
  templateUrl: './view-devices.component.html',
  styleUrls: ['./view-devices.component.scss']
})
export class ViewDevicesComponent implements OnInit {

  devices: any[] = []; // Array to hold fetched devices
  orgMail !:string;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.fetchDevices();
  }

  fetchDevices(): void {
    this.deviceService.fetchDevice().subscribe(
      response => {
        // console.log(response)
        this.devices = response.devices; // Assign fetched devices to component property
        this.orgMail = response.orgMail;
      },
      error => {
        // console.error('Error fetching devices:', error); // Log error
      }
    );
  }

}
