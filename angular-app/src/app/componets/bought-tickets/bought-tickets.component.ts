import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-bought-tickets',
  templateUrl: './bought-tickets.component.html',
  styleUrls: ['./bought-tickets.component.scss']
})
export class BoughtTicketsComponent implements OnInit {
  purchasedTickets: any[] = []; // Property to store purchased tickets
  eventImage: string | undefined; // Property to store event image

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve purchased tickets and event image from query parameter
    this.route.queryParams.subscribe(params => {
      if (params['tickets']) {
        this.purchasedTickets = JSON.parse(params['tickets']);
        this.eventImage = params['event_image'];
        this.generateQRCodeForTickets();
      }
    });
  }

  generateQRCodeForTickets(): void {
    this.purchasedTickets.forEach(ticket => {
      const text = ticket.qr_code; // Use the QR code URL from the ticket object
      QRCode.toDataURL(text, (err, url) => {
        if (err) {
          console.error(err);
        } else {
          ticket.qrCodeDataURL = url; // Add the generated QR code URL to the ticket object
        }
      });
    });
  }
}
