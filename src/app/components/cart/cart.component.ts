import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
<<<<<<< HEAD
=======
import { AuthenticateService } from 'src/app/services/authenticate.service';
>>>>>>> develop

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : Training[] | undefined;
  amount : number = 0;
  connected : boolean = false;
  userId : number;

  constructor(private cartService : CartService , private router : Router,  public authService : AuthenticateService) { 
    this.connected = authService.isConnected();
    this.userId = authService.getUser().id;
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.amount = this.cartService.getAmount();
  }

  onRemoveFromCart(training : Training){
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart();
    this.amount = this.cartService.getAmount();
  }

  onNewOrder(){
    if(this.connected){
      this.router.navigateByUrl('customer');

    } else {
      this.router.navigateByUrl('login');
    }
  }
}
