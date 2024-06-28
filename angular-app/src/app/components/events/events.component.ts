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
    const selectedEvent = this.events.find(event => event.id === id);
    if (selectedEvent) {
      this.router.navigate(['purchase_ticket', id], { 
        queryParams: { 
          ticket_price: selectedEvent.ticket_price 
        } 
      });
    }
  }
  

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
