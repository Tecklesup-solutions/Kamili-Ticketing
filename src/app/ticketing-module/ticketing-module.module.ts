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
import { CreatePosterComponent } from './components/create-poster/create-poster.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { OrganizationCheckComponent } from './components/organization-check/organization-check.component';
import { SetPaymentComponent } from './components/set-payment/set-payment.component';
import { SetMpesaComponent } from './components/set-mpesa/set-mpesa.component';
import { SetCardpaymentComponent } from './components/set-cardpayment/set-cardpayment.component';
import { SetOrgpaymentComponent } from './components/set-orgpayment/set-orgpayment.component';
import { TicketingComponentComponent } from './components/ticketing-component/ticketing-component.component';
import { ShowQueriesComponent } from './components/show-queries/show-queries.component';
import { CreateQueriesComponent } from './components/create-queries/create-queries.component';


const ticketingRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  {path:'create-event', component:CreateEventComponent},
  { path: 'create-event/:id/edit', component: CreateEventComponent },
  {path:'event-info/:id', component:EventInfoComponent},
  {path: 'event-info/:id/attendees-list', component: AttendeesListComponent },
  {path:'devices', component:DevicesComponent},
  {path:'create-poster', component:CreatePosterComponent},
  {path:'subscription', component:SubscriptionComponent},
  {path:'payment', component:SetPaymentComponent},
  {path:'tickets', component:TicketingComponentComponent}

  
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
    ViewDevicesComponent,
    CreatePosterComponent,
    SubscriptionComponent,
    OrganizationCheckComponent,
    SetPaymentComponent,
    SetMpesaComponent,
    SetCardpaymentComponent,
    SetOrgpaymentComponent,
    TicketingComponentComponent,
    ShowQueriesComponent,
    CreateQueriesComponent

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
