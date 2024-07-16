import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit{

  constructor(
    private router: Router,
    private authenticationServ$ :AuthServiceService,
  ){}

  loading:boolean = false;
  forgetPassForm !:FormGroup;
  errorMessage !:string;


  ngOnInit() {
    this.forgetPassForm = new FormGroup({
      email: new FormControl(''),
    });
    
  }



  onSubmit() {
    this.loading = true; // Start loading
    this.authenticationServ$.forgetPassword(this.forgetPassForm.value).subscribe(response => {
      if (response.success) {
        this.loading = false; // Stop loading on success
        this.router.navigate(['confirm_email'], { queryParams: { action: 'reset_password' } });
      } else {
        this.loading = false; // Also stop loading on failure
        this.errorMessage = "Something went wrong, please try again.";
      }
    }, () => {
      this.loading = false; // Handle any errors and stop loading
      this.errorMessage = "An unexpected error occurred. Please try again later.";
    });
  }
  

  navigateLogin(){
    this.router.navigate(['login']);
  }

}
