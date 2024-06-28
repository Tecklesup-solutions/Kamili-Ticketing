import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  constructor(
    private eventsService$ : EventService,
    private router : Router
  ){
    this.subscription = new Subscription()
  }
   events : any[] = [];

  private subscription : Subscription;


  ngOnInit(): void {
    this.subscription.add(
      this.eventsService$.fetchOrgEvents().subscribe(
        (response) => {
          this.events = response.events; // Assign fetched events to 'events' array
          console.log(this.events)
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      )
    );
  }

  eventInfo(id: number) {
    this.router.navigate(['ticketing/event-info', id]);
  }
  

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
