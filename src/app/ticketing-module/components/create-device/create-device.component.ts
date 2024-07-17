import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {
  loading: boolean = false;
  deviceForm!: FormGroup;
  message!:string;
  eventNames: string[] = []; // Property to hold event names

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.eventService.fetchEventNames().subscribe(
      response => {
        this.eventNames = response; 
      },
      error => {
        // console.log(error)
        
      }
    );

    this.deviceForm = new FormGroup({
      device_name: new FormControl('', Validators.required), 
      device_location: new FormControl('', Validators.required), 
      device_pin: new FormControl('', Validators.required), 
      event: new FormControl('', Validators.required) 
    });
  }

  createDevice() {
    this.message=""
    if (this.deviceForm.valid) { // Check if form is valid
      this.loading = true;
      this.deviceService.createDevice(this.deviceForm.value).subscribe(
        response => {
          console.log(response)
          if(response.success){
            this.loading = false;
            window.location.reload();
          }
        },
        error => {
          console.log(error)
          this.message = error.error.message;
          this.loading = false;
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.values(this.deviceForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
