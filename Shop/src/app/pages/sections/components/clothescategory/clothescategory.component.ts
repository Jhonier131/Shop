import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core/core';

@Component({
  selector: 'app-clothes-category',
  templateUrl: './clothescategory.component.html',
  styleUrls: ['./clothescategory.component.css']
})
export class CategoryClothes implements OnInit, AfterViewInit {
  
  public allClothes: any = []
  public category!: number;
  public loader: boolean = false;

  constructor(
    private shopServices: ShopService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.route.paramMap.subscribe((params: any) => {
      this.category = params.get('category');
      this.getClothesByCategory(this.category);
    });

    this.scrollToTop();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  }

  getClothesByCategory(category: any) {
    this.shopServices.getByCategory(category).subscribe(tshirts => {
      this.allClothes  = tshirts.payload;
      this.category = category;
    })
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterCategory(category: number) {
    this.loader = true;
    this.shopServices.getByCategory(category).subscribe(clothes => {
      this.allClothes = clothes.payload;
      this.loader = false;
      this.category = category;
    })
  }

  seleccionarTalla(talla: string): void {
    this.allClothes = {
      ...this.allClothes,
      talla
    }
  }

}
