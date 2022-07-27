export class User {
    id: number;
    mail : string;
    password : string;
    roles: string[];

    constructor(id: number, mail:string, password : string, roles : string[]){
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.roles = roles;
    }
}