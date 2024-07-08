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
  ticketPrice: number = 1500; // Initialize with a default ticket price

  ticketingForm!: FormGroup;

  constructor(private route: ActivatedRoute, private $events: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      console.log('Event ID:', this.eventId);
    });
  
    this.ticketingForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      noTickets: new FormControl(1), // Initialize with 1 ticket
      totalCost: new FormControl(this.ticketPrice) // Initialize with default price
    });
  
    // Subscribe to changes in noTickets to calculate totalCost dynamically
    this.ticketingForm.get('noTickets')?.valueChanges.subscribe(value => {
      const noTickets = parseInt(value, 10);
      if (!isNaN(noTickets)) {
        const totalCost = noTickets * this.ticketPrice;
        this.ticketingForm.patchValue({ totalCost });
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

  purchaseTickets() {
    this.showSpinner = true;
    console.log(this.ticketingForm.value)
    this.$events.purchaseTickets(this.eventId, this.ticketingForm.value).subscribe(
      (response: any) => {
        console.log('Tickets purchased successfully:', response);
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
        console.error('Error purchasing tickets:', error);
        this.showSpinner = false;
      }
    );
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
}
