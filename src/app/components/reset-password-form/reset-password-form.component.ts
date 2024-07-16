import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading: boolean = false;
  token: string = ''; // Variable to hold the token extracted from the URL

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for form initialization
    private router: Router,
    private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
    private authServe: AuthServiceService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token']; // Extract the token from the URL
    });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    
    if (this.resetPasswordForm.valid) {
      this.loading = true; // Start loading
      const userDetails = {
        email: this.resetPasswordForm.controls['email'].value,
        password: this.resetPasswordForm.controls['password'].value,
        token: this.token // Pass the token along with user details
      };
      console.log('Token' + this.token); 
      this.authServe.resetPassword(userDetails).subscribe(response => {
        alert("password reset successfully");
        this.router.navigate(['login']);
        this.loading = false; // Ensure loading is set to false on success
      }, error => {
        // Handle error response
        this.loading = false; // Ensure loading is set to false on error
      });
    }
  }
  
}
