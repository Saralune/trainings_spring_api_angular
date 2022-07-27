import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { Orders } from '../model/orders.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public postOrder(orders: Orders){
    return this.http.post<Orders>(environment.host + "/orders", orders);
  }

  public postCustomer(customer: Customer){
    return this.http.post<Customer>(environment.host + "/customer", customer);
  }

  public getCustomerId(customer: Customer){
    return this.http.get<Customer>(environment.host + "/customer");
  }

  public getUserById(id : number){
    return this.http.get<User>(environment.host + "/customer");
  }

  // public getCustomersByUserMail(user: User){
  //   return this.http.get<Customer>(environment.host + "/customer");
  // }


}

//coté front one peux pas récupérer l'id customer