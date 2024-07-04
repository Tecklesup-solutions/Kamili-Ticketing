import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MpesaServiceService } from '../../services/mpesa-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-set-mpesa',
  templateUrl: './set-mpesa.component.html',
  styleUrls: ['./set-mpesa.component.scss']
})
export class SetMpesaComponent implements OnInit {
  constructor(private mpesaServ: MpesaServiceService, private authServe: AuthServiceService) { }

  mpesaForm!: FormGroup;
  userOrg: boolean = true;
  mpesaData: any = {}; // Variable to hold fetched MPESA credentials

  ngOnInit() {
    this.fetchUser();
    this.mpesaForm = new FormGroup({
      short_code: new FormControl(''),
      partya: new FormControl(''),
      partyb: new FormControl(''),
      phone_number: new FormControl('')
    });

    this.fetchFormData();
  }

  fetchFormData() {
    this.mpesaServ.fetchMpesaCreds().subscribe(response => {
      console.log(response);
      this.mpesaData = response.mpesa; // Assign response to mpesaData variable for template binding

      if (this.mpesaData) {
        this.mpesaForm.patchValue({
          short_code: this.mpesaData.short_code || '',
          partya: this.mpesaData.partya || '',
          partyb: this.mpesaData.partyb || '',
          phone_number: this.mpesaData.phone_number || ''
        });
      }
    }, error => {
      console.log(error);
    });
  }

  fetchUser() {
    this.authServe.fetchUser().subscribe(response => {
      if (response.user.org_id == null) {
        this.userOrg = false;
      } else {
        this.userOrg = true;
      }
    }, error => {
      console.error('Error fetching user:', error);
    });
  }

  submitForm(): void {
    this.mpesaServ.createMpesaCreds(this.mpesaForm.value).subscribe(response => {
      console.log(response);
      // Handle success response as needed
    }, error => {
      console.log(error);
      // Handle error if needed
    });
  }
}
