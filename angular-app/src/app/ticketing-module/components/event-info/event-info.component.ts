import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  eventId!: number; // Property to store the event id
  eventDetails: any; // Property to store event details

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    // Retrieve the id from the route parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Convert id to a number (assuming it's a number)
      // Fetch single event using the eventId
      this.eventsService.fetchSingleEvent(this.eventId).subscribe(
        response => {
          console.log(response);
          this.eventDetails = response.events; // Assign the single event directly to eventDetails
        },
        error => {
          // Handle error
          console.log(error)
        }
      );
    });
  }

  navigateToAttendeesList(): void {
    // Navigate to the attendees list page for the current event
    this.router.navigate(['ticketing/event-info', this.eventId, 'attendees-list']);
  }

}
