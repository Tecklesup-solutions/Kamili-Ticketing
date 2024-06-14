import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-purchase-ticket',
  templateUrl: './purchase-ticket.component.html',
  styleUrls: ['./purchase-ticket.component.scss']
})
export class PurchaseTicketComponent implements OnInit {
  eventId!: number;
  showSpinner: boolean = false;

  constructor(private route: ActivatedRoute, private $events: EventsService, private router: Router) { }

  ticketingForm!: FormGroup;

  ngOnInit(): void {
    // Retrieve the event ID from route parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // (+) converts string 'id' to a number
      console.log('Event ID:', this.eventId);
    });

    this.ticketingForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      noTickets: new FormControl(''),
      totalCost: new FormControl(''),
    });
  }

  purchaseTickets() {
    this.showSpinner = true;
    this.$events.purchaseTickets(this.eventId, this.ticketingForm.value).subscribe(
      (response) => {
        console.log('Tickets purchased successfully:', response);
        // Pass the purchased tickets and event image as query parameters
        this.router.navigate(['bought-tickets'], { 
          queryParams: { 
            tickets: JSON.stringify(response.tickets),
            event_image: response.event_image // Add event image to query parameters
          } 
        });
        this.showSpinner = false;
      },
      (error) => {
        console.error('Error purchasing tickets:', error);
        this.showSpinner = false;
      }
    );
  }
  

}
