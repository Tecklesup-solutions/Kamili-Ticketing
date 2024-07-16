import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit{
  displayMessage: string = '';


  constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['action'] === 'reset_password') {
      // Display password reset success message
      this.displayMessage = "Password reset successfully. Link has been sent to your email";
    } else if (params['action'] === 'account_creation') {
      // Display account verification message
      this.displayMessage = "Please check your email to verify your account";
    }
  });
}
}
