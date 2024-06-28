import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit{
  constructor(private authServe:AuthServiceService){}

  userOrg:boolean  = true

  ngOnInit(): void {
     this.fetchUser();
  }

  viewDevices:boolean = true

  viewAvailableDevices(){
    this.viewDevices = true
  }

  createDevices(){
    this.viewDevices = false
  }

  fetchUser(){
    this.authServe.fetchUser().subscribe(response=>{
      console.log(response)
      if(response.user.org_id == null){
        this.userOrg = false
      }else{
        this.userOrg = true
      }
    }, error=>{
      // console.log(error)
    })
  }
}
