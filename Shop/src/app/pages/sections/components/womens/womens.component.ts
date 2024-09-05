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
  public pagination: any = {
    page: 1,
    nextPage: 2
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
      this.getWomensClothes();
    }, 1000)
  }
  

  getWomensClothes() {

    this.shopServices.getClothesWomens(this.pagination).subscribe( respuesta => {
      console.log('respuesta', respuesta);

      if(respuesta.payload) {
        this.allClothes = respuesta.payload.resultDocs;
        this.loader = false;
        this.toggleBodyScroll(this.loader);
        this.pagination = {page: respuesta.payload.nextPage, nextPage: respuesta.payload.nextPage};
      }
    })
  }

  irAlInicio() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // nextPage(page: number) {
  //   this.pagination.page = page;
  //   this.getWomensClothes(this.pagination);
  // }

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

    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // console.log('Altura del documento:', documentHeight);
    // console.log('Scroll Top:', scrollTop);
    // console.log('Altura del viewport:', viewportHeight);

    if(scrollTop + viewportHeight >= documentHeight) {
      console.log('Fin de la página');
      this.getMoreClothes();
    }

    // const element = this.womensSection.nativeElement;
    // if(window.scrollY >= 700) {
    //   if(window.scrollY - element.scrollHeight > 50 && !this.loader) {
    //     this.getMoreClothes();
    //     console.log('Holi');
    //   }
    // }


  }

  getMoreClothes() {

    if(this.pagination.page) {
      this.shopServices.getClothesWomens(this.pagination).subscribe( respuesta => {
  
        console.log('Respuesta', respuesta);
  
        if(respuesta.payload) {
          this.pagination = {page: respuesta.payload.nextPage, nextPage: respuesta.payload.nextPage};
          this.allClothes = [...this.allClothes, ...respuesta.payload.resultDocs];
  
        }
      })
    }
  }

}
