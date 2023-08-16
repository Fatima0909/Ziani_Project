import { Component, OnInit } from '@angular/core';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CarService } from '../shared/service/car.service';
import { Car } from '../shared/model/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  cars: Car[] = [];

  displayedColumns: string[] = ['title','modele','description', 'picture' , 'actions'];
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
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '300px',
      data: { operation: 'Edit', product }
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct) {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      }
    });
  }


  redirectToOtherPage() {
    this.router.navigate(['/dashboard/addProduct']); 
  }
  private initCars() {
    this.carService.getCars().once('value').then((res) => {
     this.cars = [];
     res.forEach(val => {
       this.cars.push(val.val());
     })
     this.dataSource = this.cars;
    })
   }

  deleteProduct(product: any) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
