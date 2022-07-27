import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { TrainingsService } from './trainings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private users = [
    {id: 1, mail:'saralune@mail.com'   , password:'123' , roles:['ADMIN','USER']},
    {id: 2, mail:'user@mail.com'  , password:'123'  , roles:['USER']},    
  ];
  //private users = this.apiService.getUsers();
  userConnected : User = new User(0,"","",[]);

  constructor(private apiService : TrainingsService) { }

  //renvoi l'utilisateur en locale storage s'il existe sinon un client vide
  getUser(){
    let user = localStorage.getItem('user');    
    if(user){ //si j'ai déjà un utilisateur en LS, c'est que je suis connecté
      this.userConnected = JSON.parse(atob(user));    // décryptage
    }
    return this.userConnected;
  }

  login(mail: string, password: string) {
    let connected : boolean = false;
    this.users.forEach( (user) => {
        if((user.mail == mail) && (user.password == password)){
          connected = true;
          this.userConnected = user;
          localStorage.setItem('user',btoa(JSON.stringify(user)));  //cryptage des données avant stockage en LS
        }
    });
    return connected;
  }

  isConnected() {
    return localStorage.getItem('user') != null; 
  }

  deconnected() {
    localStorage.removeItem('user');
    this.userConnected = new User(0, "","",[]);
  }

  isAdmin() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('ADMIN') > -1)  return true;
    }
    return false;
  }

}
