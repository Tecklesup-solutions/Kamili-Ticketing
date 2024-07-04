import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private router: Router, private authService:AuthServiceService){}

  loading:boolean = false;
  errorMessage: string = '';

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    event?.preventDefault()
    this.loading=true
    this.authService.loginUser(this.loginForm.value).subscribe(response=>{
      if(response.success){
        console.log(response)
        this.authService.storeToken(response.token);
        this.loading=false
        if(response.user.org_id == null && response.user.single_user == false ){
          this.router.navigate(['choose_account']);
        }else{
          
          this.router.navigate(['ticketing']);
        }
        
      }else{
        this.loading=false
        this.errorMessage = "Failed to login";
      }
    }, error=>{
      console.log(error)
      this.loading = false;
      this.errorMessage = error.message; // Display error message
    });
    this.loading=false
  }

  registerRoute() {
    this.router.navigate(['register'])
  }
}
