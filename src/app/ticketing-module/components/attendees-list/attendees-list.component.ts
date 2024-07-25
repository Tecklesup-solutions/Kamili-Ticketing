import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss']
})
export class AttendeesListComponent implements OnInit {

  eventId!: number; // Property to store the event id
  users!: any[]; // Property to store users

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private eventsService: EventService
  ) {}

  ngOnInit(): void {
    // Retrieve the eventId from the route parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Convert id to a number (assuming it's a number)
      // Fetch users for the current event
      this.fetchUsers();
    });
  }

  fetchUsers(): void {
    this.eventsService.fetchEventUsers(this.eventId).subscribe(
      response => {
        this.users = response.users; // Assuming the response contains an array of users
      },
      error => {
        // Handle error
      }
    );
  }
}
