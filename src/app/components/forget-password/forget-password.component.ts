import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private router: Router){}

  loading:boolean = false;
  forgetPassForm !:FormGroup





  onSubmit(){


  }

  navigateLogin(){
    this.router.navigate(['login']);
  }

}
