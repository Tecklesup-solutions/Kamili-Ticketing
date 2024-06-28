import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EventsComponent } from './components/events/events.component';
import { PurchaseTicketComponent } from './components/purchase-ticket/purchase-ticket.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ChooseAccountComponent } from './components/choose-account/choose-account.component';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { VerifyLoginComponent } from './components/verify-login/verify-login.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';


const routes: Routes = [
  // { path: '', component: LandingPageComponent },
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'confirm_email', component:ConfirmEmailComponent},
  {path:'choose_account', component:ChooseAccountComponent},
  {path:'organization_details', component:OrganizationDetailsComponent},
  { path: 'ticketing', loadChildren: () => import('./ticketing-module/ticketing-module.module').then(m => m.TicketingModuleModule) },
  {path:'', component:EventsComponent},
  {path:'purchase_ticket/:id', component:PurchaseTicketComponent},
  {path:'verify/:id', component:VerifyLoginComponent},
  {path:'privacy-policy', component:PrivacyPolicyComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
