import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private router:Router, private $authServe: AuthServiceService){}

  navigateToEvents(){
    this.router.navigate(['ticketing'])
  }

  navigateToSubscription(){
    this.router.navigate(['ticketing/subscription'])
  }

  navigateToDevices(){
    this.router.navigate(['ticketing/devices']);
  }

  navigateToLogout() {
    this.$authServe.logoutUser().subscribe(
      response => {
        if (response.success) {
          localStorage.removeItem('authToken'); // Clear token from localStorage
          this.router.navigate(['']);
        } else {
          console.log(response);
        }
      },
      error => {
        console.error('Error logging out:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    );
  }
  navigateToPayment(){
    this.router.navigate(['ticketing/payment']);
  }
  navigateToTickets(){
    this.router.navigate(['ticketing/tickets']);
  }

}
