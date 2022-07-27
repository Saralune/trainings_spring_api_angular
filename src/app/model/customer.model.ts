export class Customer {
    name : string;
    firstName : string;
    address : string;
    phone : string;
    user : User;

    constructor(name : string,firstName : string, address : string,phone : string, user : User){
        this.name = name;
        this.firstName = firstName;
        this.address = address;
        this.phone = phone;
        this.user = user;
    }
}