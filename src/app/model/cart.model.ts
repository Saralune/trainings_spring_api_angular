import { Customer } from "./customer.model";
import { Training } from "./training.model";

export class Cart {
    customer : Customer;
    items : Map<number,Training>;

    ///////////////voir si on peut interroger, est-ce qu'il existe déjà un customer lié à l'user ?

    constructor(){
        this.customer = new Customer("unknown","","","", 0);
        this.items = new Map<number,Training>();
    }
}