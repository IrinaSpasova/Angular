import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  //we do not need selector anymore:
    //selector: 'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
    //we may not specify type of values in TS, for example "pageTitle: string ='Product List'"==="pageTitle ='Product List'"
    pageTitle: string ='Product List';
    imageWidth: number = 50;
    imageMargin: number =2;
    showImage: boolean = false;
    // listFilter: string = 'cart'; Instead this wi build getter and setter
    errorMessage: string = '';
    sub!: Subscription;


    private _listFilter: string ='';
    get listFilter():string{
      return this._listFilter;
    }
    set listFilter(value:string){
      this._listFilter = value;
      console.log('In setter:', value); //Go an change ngOnInit here
      this.filteredProducts = this.preformFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] =[];

    constructor(private productService: ProductService){}

    preformFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct)=>
      product.productName.toLocaleLowerCase().includes(filterBy)); // if the listFilter is empty this returns all products, so go and change *ngFor in html
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;;
        },
        error: err => this.errorMessage = err
      });
      // if we want to see all products add this:
      //
      
        //console.log('In OnInit');

        //and remove this:
        //this.listFilter = 'cart';
        // If we want to see all products => this.listFilter = '';
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void{
      this.pageTitle = 'Product List: '+ message;
    }
}
