import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-choose-account',
  templateUrl: './choose-account.component.html',
  styleUrls: ['./choose-account.component.scss']
})
export class ChooseAccountComponent implements OnInit{

  constructor(private router: Router, private authService:AuthServiceService){}

  ngOnInit(): void {
    const token =this.authService.getToken();
    console.log(token)
      
  }

  choosenAccount(accountType: string){
    if(accountType === 'single'){
      this.router.navigate(['ticketing']); // Navigate to ticketing for single user
    } else if(accountType === 'organization'){
      this.router.navigate(['organization_details']); // Navigate to organization details for organization account
    }
  }
}
