import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMessage: string = '';
  loading:boolean = false;

  constructor(private router: Router, private authService: AuthServiceService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.loading = true;
    // Call your register method here passing user data
    this.authService.registerUser(this.registrationForm.value).subscribe(response => {
      // Optionally, navigate to another page after successful registration
      console.log(response)
      this.loading = false;
      this.router.navigate(['confirm_email']); // Navigate to login page on success
    }, error => {
      console.log(error)
      this.loading = false;
      this.errorMessage = error.message; // Display error message
    });
  }

  navigateToPrivacy(){
    this.router.navigate(['privacy-policy']);
  }

  loginRoute() {
    this.router.navigate(['login']);
  }
}
