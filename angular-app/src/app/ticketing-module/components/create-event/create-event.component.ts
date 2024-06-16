import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { ImageService } from '../../services/imageService.service'; // Adjust path as needed

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnDestroy {
  private subscription: Subscription;
  fileToUpload: File | null = null; // Optional file upload
  eventsForm: FormGroup;

  ticketPriceOptions: string[] = ['Amount', 'Free']; // Options for ticket price

  constructor(private fb: FormBuilder, private eventsService: EventService, private router: Router, private imageService: ImageService) {
    this.subscription = new Subscription();
    this.eventsForm = this.fb.group({
      name: [''],
      capacity: [0],
      venue: [''],
      ticket_price: [''], // Form control for ticket price
      posterImage: [''] // Form control for poster image
    });
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
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
    formData.append('posterImage', this.eventsForm.get('posterImage')?.value);

    this.subscription = this.eventsService.createEvent(formData).subscribe(
      response => {
        this.router.navigate(['/ticketing']);
        console.log("Response:", response); 
      },
      error => {
        console.error("Error:", error);
      }
    );
  }

  createPoster(): void {
    this.router.navigate(['/ticketing/create-poster']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Method to handle image upload from service or route
  uploadPosterImage(): void {
    const imageData = this.imageService.getImageData(); // Retrieve image data from service
    if (imageData) {
      this.eventsForm.patchValue({
        posterImage: imageData // Set the poster image data in the form
      });
    }
  }
}
