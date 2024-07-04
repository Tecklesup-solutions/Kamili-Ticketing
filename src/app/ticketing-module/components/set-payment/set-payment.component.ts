import { Component } from '@angular/core';

@Component({
  selector: 'app-set-payment',
  templateUrl: './set-payment.component.html',
  styleUrls: ['./set-payment.component.scss']
})
export class SetPaymentComponent {
  showMpesa:boolean =false
  showCard:boolean = false
  showOrg:boolean = true

  setMpesa(){
    this.showMpesa =true
    this.showCard= false
    this.showOrg = false
  }
  setCard(){
    this.showMpesa =false
    this.showCard= true
    this.showOrg = false
  }
  setOrg(){
    this.showMpesa =false
    this.showCard= false
    this.showOrg= true
  }

}
