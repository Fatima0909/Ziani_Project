import { Component, OnInit } from '@angular/core';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CarService } from '../shared/service/car.service';
import { Car } from '../shared/model/car';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PictureCarouselComponent } from '../picture-carousel/picture-carousel.component';
import { Image } from '../shared/model/image';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  cars: Car[] = [];
  isNavActive = false;
  displayedColumns: string[] = ['modele','marque','Transmission','Moteur','Energie','mileage','carColor', 'description' , 'picture' , 'actions'];
  dataSource = this.products;

  constructor(private dialog: MatDialog, private carService: CarService, private router: Router) {}
  ngOnInit(): void {
    this.initCars();

  }
  

  addProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '300px',
      data: { operation: 'Add' }
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        this.products.push(newProduct);
      }
    });
  }

  editProduct(product: any) {
   this.carService.assignCar(product);
   this.redirectToOtherPage();
   
  }

toggleNav() {
  this.isNavActive = !this.isNavActive;
}




  redirectToOtherPage() {
    this.router.navigate(['/dashboard/addProduct']); 
  }
  private initCars() {
    this.carService.getCars().once('value').then((res) => {
     this.cars = [];
     res.forEach(val => {
       this.cars.push({
        ...val.val(),
        id: val.key
       });
     })
     this.dataSource = this.cars;
    })
   }

  deleteProduct(product: any) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette voiture ?',
      icon: 'warning',
    
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
    cancelButtonColor:"black",
    customClass: {
      cancelButton :   'teal_swal',
      confirmButton: 'warning_swal'
    }
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.carService.deleteCar(product.id).then(res => {
          Swal.fire('Supprimé !', 'L\'élément a été supprimé.', 'success');
          const index = this.cars.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.products.splice(index, 1);
          
        }
        })
        
    }});
  }
  openPicture(pictures: Image[]) {
    this.dialog.open(PictureCarouselComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'custom-dialog',
      data: {
        imageList: pictures,
        currentImage: pictures[0]?.imageRef,
      },
    });
  }
}
