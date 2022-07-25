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

  public getCustomersByUserMail(user: User){
    return this.http.get<Customer>(environment.host + "/customer");
  }
}

//coté front one peux pas récupérer l'id customer