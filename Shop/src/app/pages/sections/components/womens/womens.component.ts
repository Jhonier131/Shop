import { Component, OnInit, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { CarService } from 'src/app/core/store/car/car.service';
import { ShopService } from '../../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-womens',
  templateUrl: './womens.component.html',
  styleUrls: ['./womens.component.css'],
})
export class WomensComponent implements OnInit {
  // public originClothes: any = [];
  public loader: boolean = false;
  public allClothes: any = [];
  public pagination = {
    page: 1,
    limit: 10,
    nextPage: null
  }
  clotheSelected: any = null;
  tallas: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  tallaSeleccionada: string | null = null;

  constructor(
    private carStoreService: CarService,
    private shopServices: ShopService,
    private router: Router
  ) {
  }  

  @ViewChild('scrollableDiv', { static: false }) scrollableDiv!: ElementRef;

  ngOnInit(): void {
    this.loader = true;
    this.toggleBodyScroll(this.loader);
    this.irAlInicio();
    setTimeout(() => {
      this.getWomensClothes(this.pagination);
    }, 1000)
  }
  

  getWomensClothes(pagination: any) {
    this.shopServices.getClothesWomens(pagination).subscribe( respuesta => {
      console.log('respuesta', respuesta);
      this.allClothes = respuesta.payload.resultDocs;
      this.loader = false;
      this.toggleBodyScroll(this.loader);
    })
  }

  irAlInicio() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  nextPage(page: number) {
    this.pagination.page = page;
    this.getWomensClothes(this.pagination);
  }

  goCategory(category: number): void {
    this.router.navigateByUrl('/shop/clothes-category/' + category);
  }

  toggleBodyScroll(disableScroll: boolean) {
    if (disableScroll) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  @ViewChild('womensSection', { static: false }) womensSection!: ElementRef;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    const element = this.womensSection.nativeElement;
    if(window.scrollY >= 700) {
      if(window.scrollY - element.scrollHeight > 50 && !this.loader) {
        this.getMoreClothes();
      }
    }
  }

  getMoreClothes() {

    const firstClothes = this.pagination;

    if(!this.pagination.nextPage) firstClothes.page = 1;

    this.shopServices.getClothesWomens(firstClothes).subscribe( respuesta => {
      if(respuesta.payload.length) {
        this.pagination = {
          ...this.pagination,
          nextPage: respuesta.payload.nextPage
        }
        this.allClothes = [...this.allClothes, ...respuesta.payload.resultDocs];
      }
    })
  }

}
