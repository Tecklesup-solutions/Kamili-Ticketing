import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { QueriesService } from '../../services/queriesService.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  eventId!: number; // Property to store the event id
  eventDetails: any; // Property to store event details
  remainingTickets!:number;
  totalTicketsSold!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private eventsService: EventsService,
    private $eventService : EventService
  ) {}

  ngOnInit(): void {
    // Retrieve the id from the route parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Convert id to a number (assuming it's a number)
      // Fetch single event using the eventId
      this.eventsService.fetchSingleEvent(this.eventId).subscribe(
        response => {
          this.eventDetails = response.event; 
          this.remainingTickets = response.remaining_tickets;

          // Calculate total tickets sold
          this.totalTicketsSold = this.eventDetails.capacity - this.remainingTickets;
        },
        error => {
  
        }
      );
    });
  }

  navigateToAttendeesList(): void {
    // Navigate to the attendees list page for the current event
    this.router.navigate(['ticketing/event-info', this.eventId, 'attendees-list']);
  }

  deleteEvent(id: number): void {
    const confirmDelete = confirm("Are you sure you want to delete event?");
    if (confirmDelete) {
      this.$eventService.deleteEvent(id).subscribe(
        response => {
          // Optionally, you can navigate away or refresh the data on success
          this.router.navigate(['ticketing']);
        },
        error => {
          console.error('Failed to delete query', error);
          // Handle error
        }
      );
    }
  }

}
