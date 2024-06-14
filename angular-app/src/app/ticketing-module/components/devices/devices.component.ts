import { Component } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  viewDevices:boolean = true

  viewAvailableDevices(){
    this.viewDevices = true
  }

  createDevices(){
    this.viewDevices = false
  }
}
