import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orders } from 'src/app/model/orders.model';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Customer } from 'src/app/model/customer.model';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  dateOrder : Date = new Date();
  order : Orders;
  myForm : FormGroup;
  error : string = "";
  status : boolean = false;
  connected : boolean = false;
  user : User | undefined;
  customerOrder: Customer;

  //////////////////////changer l'id customer
  constructor(private formBuilder : FormBuilder, private orderService : OrdersService,
    public cartService : CartService, private router : Router, public authService : AuthenticateService) {
    this.order = new Orders(0, this.cartService.getCustomer(), this.dateOrder, cartService.getAmount());
    this.customerOrder = this.cartService.getCustomer();

    this.myForm = this.formBuilder.group({
      id : [this.order.id],
      amount : [this.cartService.getAmount(), Validators.required],
      date : [this.dateOrder, Validators.required],
      customer : 1   
    })

    this.connected = authService.isConnected();
  }

  ngOnInit(): void {
  }

  onOrder(){
    this.customerOrder.user = this.authService.getUser();

    if(confirm("Etes-vous sûr de vouloir passer commande ?")){
      //save customer -> plus besoin avec le cascade.ALL sur l'entité Customer back
      // this.orderService.postCustomer(this.customerOrder).subscribe({
      //   next : (data) => console.log(data),  
      //   error : (err) => this.error = err.message,
      //   complete : () => this.router.navigateByUrl('cart')
      // });

      this.order.customer = this.cartService.getCustomer();
      //save order V
      this.orderService.postOrder(this.order).subscribe({
        next : (data) => console.log(data),  
        error : (err) => this.error = err.message,
        complete : () => this.router.navigateByUrl('trainings')
      });

      this.cartService.clear();
      this.router.navigateByUrl('');
    }
  }
}
