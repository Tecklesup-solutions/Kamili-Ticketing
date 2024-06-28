import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private router:Router){}

  navigateToEvents(){
    this.router.navigate(['ticketing'])
  }

  navigateToSubscription(){
    this.router.navigate(['ticketing/subscription'])
  }

  navigateToDevices(){
    this.router.navigate(['ticketing/devices']);
  }

  navigateToLogout(){
    this.router.navigate(['']);
  }
  navigateToPayment(){
    this.router.navigate(['ticketing/payment']);
  }
  navigateToTickets(){
    this.router.navigate(['ticketing/tickets']);
  }

}
