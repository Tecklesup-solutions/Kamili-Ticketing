import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit, OnDestroy {

  @ViewChild(PaginatorComponent)
  paginatorComponent!: PaginatorComponent;

  @Output() pageDataUpdated = new EventEmitter<{ currentPage: number; totalPages: number }>();

  
  totalPages !: number ;
  currentPage !: number;
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchEvents(page);
  }


  events: any[] = [];
  visibleEvents: any[] = [];
  
  pageSize = 9; // Number of items per page
  totalEvents = 0;
  noEventsFound: boolean = false;
  private subscription: Subscription;


  constructor(
    private eventsService$: EventsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscription = new Subscription();
  }


 


  ngAfterViewInit(): void {
    this.fetchEvents(1); // Fetch events starting from the first page
    setTimeout(() => {
      this.pageDataUpdated.emit({ currentPage: this.currentPage, totalPages: this.totalPages });
      this.cdr.detectChanges(); 
    }, 100); 

    console.log("pages "+ this.totalPages)
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchEvents(page: number): void {
    this.subscription.add(
      this.eventsService$.fetchEvents(page).subscribe(
        (response) => {
          console.log(response)
          if (response.status) {
            this.events = response.events.data;
            this.visibleEvents = [...this.events];
            this.totalEvents = response.total;
            this.totalPages = response.events.last_page
            this.currentPage = response.events.current_page
            this.pageDataUpdated.emit({ currentPage: this.currentPage, totalPages: this.totalPages });
          } else {
            console.error('Invalid response format:', response);
          }
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
      this.visibleEvents = [...this.events]; 
    } else {
      this.visibleEvents = this.events.filter(event => event.category_id.toString() === categoryId);
    }

    if (this.visibleEvents.length === 0) {
      this.noEventsFound = true; // Set flag to true to show error message
    } else {
      this.noEventsFound = false; // Reset flag if events are found
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
