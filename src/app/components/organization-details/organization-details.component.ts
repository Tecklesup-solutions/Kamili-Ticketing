import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationServiceService } from 'src/app/ticketing-module/services/organization-service.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent {
  constructor(private router: Router,private $OrgService:OrganizationServiceService){}


  loading:boolean = false;
  errorMessage: string = '';

  organizationForm!: FormGroup;

  ngOnInit() {
    this.organizationForm = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });
  }


  createOrganization(){
    event?.preventDefault()
    this.loading=true

    this.$OrgService.createOrganization(this.organizationForm.value).subscribe(response=>{
      this.loading=false
      this.router.navigate(['ticketing']);

    }, error=>{
      this.loading = false;
      this.errorMessage = error; // Display error message
    });

  }

}
