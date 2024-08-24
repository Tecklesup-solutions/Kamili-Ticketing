import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  fileToUpload: File | null = null;
  eventsForm: FormGroup;
  loading: boolean = false;
  categories: any[] = [];
  imageUrl: any;
  eventId!: number; // Define eventId

  constructor(
    private fb: FormBuilder,
    private eventsService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription = new Subscription();
    
    // Initialize form and populate values if available
    this.eventsForm = this.fb.group({
      name: [''],
      capacity: [],
      venue: [''],
      ticket_price: [''],
      category_id: ['']
    });

    // Subscribe to route params to fetch eventId
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      // Retrieve eventDetails from state object
      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState && navigationState['eventDetails']) {
        // Populate form directly in constructor
        this.eventsForm.patchValue({
          name: navigationState['eventDetails'].name,
          capacity: navigationState['eventDetails'].capacity,
          venue: navigationState['eventDetails'].venue,
          ticket_price: navigationState['eventDetails'].ticket_price,
          category_id: navigationState['eventDetails'].category_id
        });
        this.imageUrl = navigationState['eventDetails'].image; // Assuming image URL is directly accessible
      } else {
        // Fetch event details if not available in state (handle initial create scenario)
        this.fetchEventDetails(this.eventId);
      }
    });
  }

  ngOnInit(): void {
    this.fetchEventCategories();
  }

  fetchEventDetails(eventId: number): void {
    this.subscription = this.eventsService.fetchSingleEvent(eventId).subscribe(
      (response: any) => {
        // Populate form directly in constructor
        this.eventsForm.patchValue({
          name: response.event.name,
          capacity: response.event.capacity,
          venue: response.event.venue,
          ticket_price: response.event.ticket_price,
          category_id: response.event.category_id
        });
        this.imageUrl = response.event.image; // Assuming image URL is directly accessible
      },
      error => {
        console.error('Error fetching event details', error);
      }
    );
  }

  fetchEventCategories(): void {
    this.subscription = this.eventsService.fetchEventCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  submitForm(): void {
    const formData = new FormData();
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload);
    }
    formData.append('name', this.eventsForm.get('name')?.value);
    formData.append('capacity', this.eventsForm.get('capacity')?.value);
    formData.append('venue', this.eventsForm.get('venue')?.value);
    formData.append('ticket_price', this.eventsForm.get('ticket_price')?.value);
    formData.append('category_id', this.eventsForm.get('category_id')?.value);
    this.loading = true;

    if (this.eventId) {
      // Update existing event
      this.subscription = this.eventsService.updateEvent(this.eventId, formData).subscribe(
        response => {
          this.loading = false;
          if (response.status === true) {
            this.router.navigate(['/ticketing']);
          }
        },
        error => {
          this.loading = false;
          console.error('Error updating event:', error);
        }
      );
    } else {
      // Create new event
      this.subscription = this.eventsService.createEvent(formData).subscribe(
        response => {
          this.loading = false;
          if (response.status === true) {
            this.router.navigate(['/ticketing']);
          }
        },
        error => {
          this.loading = false;
          console.error('Error creating event:', error);
        }
      );
    }
  }

  createPoster(): void {
    this.router.navigate(['/ticketing/create-poster']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
