import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private authService: AuthServiceService) {}

  newsLetterForm!: FormGroup;
  subscriptionMessage: string = ''; // Variable to store success or error message

  ngOnInit() {
    this.newsLetterForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  onSubmit() {
    this.authService.submitEmail(this.newsLetterForm.value).subscribe(
      (response) => {
        if (response.status) {
          this.subscriptionMessage = response.message;
          this.newsLetterForm.reset(); // Reset the form
        } else {
          this.subscriptionMessage = response.message;
        }
      },
      (error) => {
        this.subscriptionMessage = 'An error occurred  or email already subscribed';
      }
    );
  }
}
