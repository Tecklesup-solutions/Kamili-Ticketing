import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './components/events/events.component';
import { PurchaseTicketComponent } from './components/purchase-ticket/purchase-ticket.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ChooseAccountComponent } from './components/choose-account/choose-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { VerifyLoginComponent } from './components/verify-login/verify-login.component';
import { BoughtTicketsComponent } from './componets/bought-tickets/bought-tickets.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    EventsComponent,
    PurchaseTicketComponent,
    RegisterPageComponent,
    ConfirmEmailComponent,
    ChooseAccountComponent,
    OrganizationDetailsComponent,
    VerifyLoginComponent,
    BoughtTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, 
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
