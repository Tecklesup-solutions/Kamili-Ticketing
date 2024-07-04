import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-verify-login',
  templateUrl: './verify-login.component.html',
  styleUrls: ['./verify-login.component.scss']
})
export class VerifyLoginComponent implements OnInit {
  id!: string; // Variable to store the ID from the URL
  verificationFailed: boolean = false; 

  constructor(private router: Router, 
              private route: ActivatedRoute, // Inject ActivatedRoute
              private authServ$: AuthServiceService) {}

  ngOnInit(): void {
    // Retrieve ID from the URL
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.router.navigate(['login']);
    });

    // Call the service method
    this.authServ$.verifyUser(this.id).subscribe(response => {
      // Handle the response
    }, error => {
      // Handle errors
      this.verificationFailed = true;
    });
  }
}
