import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orders } from 'src/app/model/orders.model';
import { OrdersService } from 'src/app/services/orders.service';


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

  //////////////////////changer l'id customer
  constructor(private formBuilder : FormBuilder, private orderService : OrdersService,
    public cartService : CartService, private router : Router) {
    this.order = new Orders(0, 1, this.dateOrder, cartService.getAmount());
    this.myForm = this.formBuilder.group({
      id : [this.order.id],
      amount : [this.cartService.getAmount(), Validators.required],
      date : [this.dateOrder, Validators.required],
      customer : 1   
    })
  }

  ngOnInit(): void {

  }

  onOrder(){
      if(confirm("Etes-vous sûr de vouloir passer commande ?")){
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
