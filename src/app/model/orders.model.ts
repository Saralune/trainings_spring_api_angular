import { Customer } from "./customer.model";

export class Orders {
    id : number;
    customer_id : number;
    date : Date;
    amount : number;
    //ordersItem : OrdersItem;

    constructor(id: number, customer_id: number, date: Date, amount: number){
        this.id = id;
        this.customer_id = customer_id;
        this.date = date;
        this.amount = amount;
    }
}