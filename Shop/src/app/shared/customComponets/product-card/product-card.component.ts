import { Component, Input, OnInit } from '@angular/core';
import { CarService } from 'src/app/core/store/car/car.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() clothe!: any;

  constructor(
    private carStoreService: CarService
  ) { }

  ngOnInit(): void {
  }

  seleccionarTalla(item: any, talla: string): void {
    this.clothe = {
      ...this.clothe,
      talla
    }
  }

  agregarCarrito(item:any) {
    this.carStoreService.addNewItem(this.clothe);
  }

}
