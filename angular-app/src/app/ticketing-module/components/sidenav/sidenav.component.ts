import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private router:Router){}
  showSidenav:boolean =  true;



  toggleSideNav() {
    this.showSidenav =!this.showSidenav; // Toggle the state
  }


  navigateToEvents(){
    this.router.navigate(['ticketing'])
  }

  navigateToDevices(){
    this.router.navigate(['ticketing/devices']);
  }

  navigateToLogout(){
    this.router.navigate(['']);
  }

}
