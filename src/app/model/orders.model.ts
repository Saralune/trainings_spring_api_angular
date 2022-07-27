import { Customer } from "./customer.model";

export class Orders {
    id : number;
    customer : Customer;
    date : Date;
    amount : number;
    //ordersItem : OrdersItem;

    constructor(id: number, customer: Customer, date: Date, amount: number){
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.amount = amount;
    }
}