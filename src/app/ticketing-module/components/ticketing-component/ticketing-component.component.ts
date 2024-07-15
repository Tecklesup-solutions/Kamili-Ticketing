import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-ticketing-component',
  templateUrl: './ticketing-component.component.html',
  styleUrls: ['./ticketing-component.component.scss']
})
export class TicketingComponentComponent implements OnInit{
  showModal: boolean = false;
  userOrg:boolean  = true

  ngOnInit(): void {
     this.fetchUser();
  }

  constructor(private authServe:AuthServiceService) {}

  fetchUser(){
    this.authServe.fetchUser().subscribe(response=>{
      console.log(response)
      if(response.user.org_id == null){
        this.userOrg = false
      }else{
        this.userOrg = true
      }
    }, error=>{
      // console.log(error)
    })
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleQueryCreated() {
    // Toggle modal to switch to view all queries
    this.showModal = false;
  }
}
