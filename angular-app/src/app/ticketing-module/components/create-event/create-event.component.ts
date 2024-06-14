import { Component, OnDestroy } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnDestroy {
  private subscription: Subscription;
  fileToUpload: File | null = null; // Making fileToUpload optional

  eventsForm: FormGroup;

  constructor(private fb: FormBuilder, private eventsService: EventService) {
    this.subscription = new Subscription();
    this.eventsForm = this.fb.group({
      name: [''],
      capacity: [0],
      venue: [''],
      ticket_price: [0]
    });
  }

  // Define onFileSelected method to handle file selection
  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
    if (this.fileToUpload) { // Check if fileToUpload is not null
      formData.append('image', this.fileToUpload);
    }
    formData.append('name', this.eventsForm.get('name')?.value); // Use optional chaining
    formData.append('capacity', this.eventsForm.get('capacity')?.value);
    formData.append('venue', this.eventsForm.get('venue')?.value);
    formData.append('ticket_price', this.eventsForm.get('ticket_price')?.value);

    

    this.subscription = this.eventsService.createEvent(formData).subscribe(
      response => {
        console.log("Response:", response); 
      },
      error => {
        console.error("Error:", error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
