import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventInfoComponent } from './components/event-info/event-info.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AttendeesListComponent } from './components/attendees-list/attendees-list.component';
import { DevicesComponent } from './components/devices/devices.component';
import { CreateDeviceComponent } from './components/create-device/create-device.component';
import { ViewDevicesComponent } from './components/view-devices/view-devices.component';


const ticketingRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  {path:'create-event', component:CreateEventComponent},
  {path:'event-info/:id', component:EventInfoComponent},
  { path: 'event-info/:id/attendees-list', component: AttendeesListComponent },
  {path:'devices', component:DevicesComponent}
  
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    CreateEventComponent,
    EventInfoComponent,
    AttendeesListComponent,
    DevicesComponent,
    CreateDeviceComponent,
    ViewDevicesComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ticketingRoutes),
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ]
})
export class TicketingModuleModule { }
