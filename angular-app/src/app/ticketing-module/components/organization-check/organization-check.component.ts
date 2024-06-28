import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-check',
  templateUrl: './organization-check.component.html',
  styleUrls: ['./organization-check.component.scss']
})
export class OrganizationCheckComponent {
  constructor(private router:Router){}

  navigateToOrganization(){
    this.router.navigate(['organization_details']);
  }
}
