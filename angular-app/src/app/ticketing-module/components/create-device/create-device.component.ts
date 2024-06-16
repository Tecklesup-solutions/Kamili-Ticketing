import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit{

  constructor(private deviceService:DeviceService, private router:Router){}
  loading:boolean = false;
  deviceForm!: FormGroup;

  ngOnInit() {
    this.deviceForm = new FormGroup({
      device_name: new FormControl(''),
      device_location: new FormControl(''),
      device_pin: new FormControl(''),
    });
  }

  createDevice(){
    this.loading = true
    this.deviceService.createDevice(this.deviceForm.value).subscribe(response=>{
      this.loading = false
      this.router.navigate(['ticketing/devices'])
    },error=>{
      console.log(error);
      this.loading = false
    })
  }

}
