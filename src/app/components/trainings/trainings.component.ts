// import { Component, OnInit } from '@angular/core';
// import { Training } from 'src/app/model/training.model';
// import { CartService } from 'src/app/services/cart.service';
// import { Router } from '@angular/router';
// import { TrainingsService } from 'src/app/services/trainings.service';

// @Component({
//   selector: 'app-trainings',
//   templateUrl: './trainings.component.html',
//   styleUrls: ['./trainings.component.css']
// })
// export class TrainingsComponent implements OnInit {
//   listTrainings : Training[] = [];

//   constructor(private cartService : CartService, private router : Router, private trainingsService : TrainingsService) {
//    }

//   ngOnInit(): void {
//     //boucle dans une boucle !
//     this.trainingsService.getTrainings().forEach(el => {
//       for (let i = 0; i < el.length; i++) {
//         this.listTrainings.push(el[i])
//       }
//     });
//   }

//   onAddToCart(training:Training){
//     if(training.quantity > 0) {
//       this.cartService.addTraining(training);
//       this.router.navigateByUrl('cart');
//     }
//   }

//   getTrainings(){
//     this.trainingsService.getTrainings();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { TrainingsService } from 'src/app/services/trainings.service';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
//import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  listTrainingsByIdCat : Training[] | undefined;
  listCategories : Category[] | undefined;
  error = null;
  
  constructor(private cartService : CartService, private router : Router, 
    private apiService : TrainingsService, private categoryService : CategoryService) { //, public authService : AuthenticateService
  }

  ngOnInit(): void {
    this.getAllTrainings();
    this.getAllCategories();
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }
  getAllTrainingsByIdCat(id: number) {
    this.apiService.getTrainingsByIdCat(id).subscribe({
      next : (data) => this.listTrainingsByIdCat = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  displayTrainingsByIdCat(id: number){
    this.router.navigateByUrl('category/' + id + "/trainings");
  }
  
  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next : (data) => this.listCategories = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  onAddToCart(training:Training){
    if(this.cartService.getTraining(training) != 0){
      //this.cartService.getTraining(training) += training.quantity;
    } 
    else {
      if(training.quantity > 0) {
        this.cartService.addTraining(training);
        //this.router.navigateByUrl('cart');
      }
    }

  }

  onDeleteTraining(training : Training){
    if(confirm("vous êtes sur de vouloir supprimer cette formation")) {
      this.apiService.delTraining(training).subscribe({
        next : (data) => console.log(data),
        error : (err) => this.error = err.message,
        complete : () => this.getAllTrainings()
      })
    }
  }

  onUpdateTraining(training : Training){
    this.router.navigateByUrl('training/' + training.id);
  }
}
