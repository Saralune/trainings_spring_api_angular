import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {  
  isCustomer : boolean = false;
  constructor(public cartService : CartService, private router : Router) {  
    if(this.getCustomer()) this.isCustomer = true;
  }

  ngOnInit(): void {
  }

  getCustomer() : boolean{
    
    return true;
  }

  onSaveCustomer(customer : Customer){
    this.cartService.saveCustomer(customer);
    this.router.navigateByUrl('order');
  }
}
