// purchase-ticket.component.ts
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
  showImageModal: boolean = false; // Flag to control image modal display
  event: any = null;
  remaining_tickets!: number;

  ticketingForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private $events: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      this.fetchEvent();
    });

    this.ticketingForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      noTickets: new FormControl(1),
      totalCost: new FormControl()
    });

    // Subscribe to changes in noTickets to calculate totalCost dynamically
    this.ticketingForm.get('noTickets')?.valueChanges.subscribe(value => {
      if (this.event) {
        const noTickets = parseInt(value, 10);
        if (!isNaN(noTickets)) {
          const totalCost = noTickets * this.event.ticket_price;
          this.ticketingForm.patchValue({ totalCost });
        }
      }
    });
  }

  increaseQuantity() {
    let currentValue = this.ticketingForm.get('noTickets')?.value;
    currentValue++;
    this.ticketingForm.patchValue({ noTickets: currentValue });
  }

  decreaseQuantity() {
    let currentValue = this.ticketingForm.get('noTickets')?.value;
    if (currentValue > 1) {
      currentValue--;
      this.ticketingForm.patchValue({ noTickets: currentValue });
    }
  }

  fetchEvent() {
    this.$events.fetchSingleEvent(this.eventId).subscribe(
      (response: any) => {
        this.event = response.event;
        this.remaining_tickets = parseInt(response.remaining_tickets);
        this.ticketingForm.patchValue({ totalCost: this.event.ticket_price });
      },
      (error) => {
        console.error('Error fetching event:', error);
      }
    );
  }

  purchaseTickets() {
    this.showSpinner = true;

    // Get the number of tickets user wants to purchase
    const noTickets = parseInt(this.ticketingForm.get('noTickets')?.value, 10);

    if (this.remaining_tickets == 0) {
      alert("Event Sold out!")
      this.resetTicketingForm();
      this.showSpinner = false;
      return;
    } else if (noTickets > this.remaining_tickets) {
      console.log("remaining tickets is " + this.remaining_tickets);
      alert("Not enough tickets available")
      this.resetTicketingForm();
      this.showSpinner = false;
      return;
    }

    this.$events.purchaseTickets(this.eventId, this.ticketingForm.value).subscribe(
      (response: any) => {
        const pdfData = response.pdf;
        const blob = this.base64toBlob(pdfData, 'application/pdf');
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'tickets.pdf';
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        this.showSpinner = false;
        this.router.navigate(['']);
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  openImageModal() {
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
  }

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

  resetTicketingForm() {
    this.ticketingForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      noTickets: 1,
      totalCost: null
    });
  }
}
