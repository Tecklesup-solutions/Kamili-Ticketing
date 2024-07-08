import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  events: any[] = [];
  visibleEvents: any[] = [];
  pageSize = 6;
  private subscription: Subscription;

  constructor(
    private eventsService$: EventsService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchEvents(): void {
    this.subscription.add(
      this.eventsService$.fetchEvents().subscribe(
        (response) => {
          this.events = response.events;
          this.visibleEvents = [...this.events]; // Initially display all events
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

  filterEventsByCategory(event: any): void {
    const categoryId = event.target.value;
    if (!categoryId || categoryId === '') {
      this.visibleEvents = [...this.events]; // Show all events if 'All' is selected
    } else {
      this.visibleEvents = this.events.filter(event => event.category_id.toString() === categoryId);
    }
  }

  getCategoryName(categoryId: number): string {
    switch (categoryId) {
      case 1: return 'Music';
      case 2: return 'Sports';
      case 3: return 'Arts & Theater';
      case 4: return 'Conferences & Seminars';
      case 5: return 'Exhibitions & Trade Shows';
      case 6: return 'Community & Festivals';
      case 7: return 'Family & Kids';
      case 8: return 'Film & Entertainment';
      case 9: return 'Charity & Fundraisers';
      case 10: return 'Workshops & Classes';
      case 11: return 'Religious & Spiritual';
      case 12: return 'Health & Wellness';
      case 13: return 'Technology & Innovation';
      case 14: return 'Gaming & eSports';
      case 15: return 'Travel & Adventure';
      default: return 'Unknown';
    }
  }

 
}
