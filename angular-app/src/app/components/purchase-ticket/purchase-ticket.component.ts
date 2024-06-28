import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-purchase-ticket',
  templateUrl: './purchase-ticket.component.html',
  styleUrls: ['./purchase-ticket.component.scss']
})
export class PurchaseTicketComponent implements OnInit {
  eventId!: number;
  showSpinner: boolean = false;
  ticketPrice: number = 0; // Variable to hold ticket price

  constructor(private route: ActivatedRoute, private $events: EventsService, private router: Router) { }

  ticketingForm!: FormGroup;

  ngOnInit(): void {
    // Retrieve the event ID and ticket price from route parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // (+) converts string 'id' to a number
      console.log('Event ID:', this.eventId);
    });

    // Retrieve ticket price from query params
    this.route.queryParams.subscribe(params => {
      this.ticketPrice = +params['ticket_price']; // (+) converts string 'ticket_price' to a number
      console.log('Ticket Price:', this.ticketPrice);

      // Initialize form with dynamic pricing
      this.ticketingForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        noTickets: new FormControl(''),
        totalCost: new FormControl(''),
      });

      // Subscribe to changes in noTickets to calculate totalCost dynamically
      this.ticketingForm.get('noTickets')?.valueChanges.subscribe(value => {
        const noTickets = parseInt(value, 10);
        if (!isNaN(noTickets)) {
          const totalCost = noTickets * this.ticketPrice;
          this.ticketingForm.patchValue({ totalCost });
        }
      });
    });
  }

  purchaseTickets() {
    this.showSpinner = true;
    this.$events.purchaseTickets(this.eventId, this.ticketingForm.value).subscribe(
      (response: any) => {
        console.log('Tickets purchased successfully:', response);

        // Extract PDF data from response
        const pdfData = response.pdf;

        // Create a blob object from the base64 encoded PDF data
        const blob = this.base64toBlob(pdfData, 'application/pdf');

        // Create object URL for the blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'tickets.pdf';
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        this.showSpinner = false;
      },
      (error) => {
        console.error('Error purchasing tickets:', error);
        this.showSpinner = false;
      }
    );
  }

  // Helper function to convert base64 to Blob
  private base64toBlob(base64Data: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
