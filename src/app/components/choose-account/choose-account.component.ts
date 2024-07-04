import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OrganizationServiceService } from 'src/app/ticketing-module/services/organization-service.service';

@Component({
  selector: 'app-choose-account',
  templateUrl: './choose-account.component.html',
  styleUrls: ['./choose-account.component.scss']
})
export class ChooseAccountComponent implements OnInit{

  constructor(private router: Router, private authService:AuthServiceService, private organizationService:OrganizationServiceService){}

  ngOnInit(): void {
    const token =this.authService.getToken();
    console.log(token)
      
  }

  choosenAccount(accountType: string){
    if(accountType === 'single'){
      this.organizationService.createSingleAccount().subscribe(response=>{
        console.log(response)
        if(response.success){
          this.router.navigate(['ticketing']);
        }
      })
      
    } else if(accountType === 'organization'){
      this.router.navigate(['organization_details']); // Navigate to organization details for organization account
    }
  }
}
