import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    
  }
  onSubmit() {
    this.loading=true
    event?.preventDefault()
    this.authService.loginUser(this.loginForm.value).subscribe(response=>{
      this.loading = true;
      if(response.success){
        this.authService.storeToken(response.token);
        this.loading=false
        if(response.user.org_id == null && response.user.single_user == false ){
          this.router.navigate(['choose_account']);
        }else{
          this.router.navigate(['ticketing']);
          this.loading = false;
        }
        
      }else{
        this.loading=false
        this.errorMessage = "Failed to login";
      }
    }, error=>{
      this.loading = false;
      this.errorMessage = "Failed to login please try again"; 
    });
    this.loading=false
  }

  registerRoute() {
    this.router.navigate(['register'])
  }

  forgotPassword(){
    this.router.navigate(['forget-pass']);
  }
}
