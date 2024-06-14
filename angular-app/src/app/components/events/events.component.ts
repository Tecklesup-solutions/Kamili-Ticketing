import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy{
  constructor(private eventsService$ : EventsService, private router:Router){
    this.subscription = new Subscription()
  }
   events : any[] = [];

  private subscription : Subscription;


  ngOnInit(): void {
    this.subscription.add(
      this.eventsService$.fetchEvents().subscribe(
        (response) => {
          this.events = response.events; // Assign fetched events to 'events' array
          console.log(this.events)
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      )
    );
  }

  purchaseTicket(id: number): void {
    // Implement ticket purchase logic here
    console.log('Purchase ticket for event ID:', id);

    // Navigate to a new route upon purchasing ticket (example: ticket purchase page)
    this.router.navigate(['purchase_ticket', id]);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
