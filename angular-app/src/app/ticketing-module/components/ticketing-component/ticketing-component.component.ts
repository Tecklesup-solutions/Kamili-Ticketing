import { Component } from '@angular/core';

@Component({
  selector: 'app-ticketing-component',
  templateUrl: './ticketing-component.component.html',
  styleUrls: ['./ticketing-component.component.scss']
})
export class TicketingComponentComponent {
  showModal: boolean = false;

  constructor() {}

  // Method to toggle the modal
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
