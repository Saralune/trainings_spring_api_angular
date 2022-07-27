import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { User } from 'src/app/model/user.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {  
  isCustomer : boolean = false;
  //customers : Customer[];

  constructor(public cartService : CartService, private router : Router) {  
    //if(this.getCustomer()) this.isCustomer = true;
    //this.customers = this.getCustomersFromUser(new User());
  }

  ngOnInit(): void {
  }

  getCustomer() : boolean{
    //TODO 
    return true;
  }

  getCustomersFromUser(user : User) : Customer[]{
    return [];
  }

  onSaveCustomer(customer : Customer){
    this.cartService.saveCustomer(customer);
    this.router.navigateByUrl('order');
  }
}
