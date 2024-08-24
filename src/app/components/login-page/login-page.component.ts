import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private authService: AuthServiceService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.success) {
          this.authService.storeToken(response.token);
          if (response.user.org_id == null && !response.user.single_user) {
            this.router.navigate(['choose_account']);
          } else {
            this.router.navigate(['ticketing']);
          }
        } else {
          this.errorMessage = 'Failed to login';
        }
      },
      (error: any) => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials';
        } else {
          this.errorMessage = 'Failed to login. Please try again.';
        }
      }
    );
  }

  registerRoute(): void {
    this.router.navigate(['register']);
  }

  navigateToForgot(): void {
    this.router.navigate(['forget-pass']);
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
