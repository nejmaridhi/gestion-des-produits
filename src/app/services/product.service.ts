import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<product>;

  constructor() {
    this.products=[
      {id:1,name:"computer",prix:6500, promotion : true},
      {id:2,name:"printer",prix:1200 , promotion: false},
      {id:3,name:"iphone",prix:1400 , promotion: true},
    ];

   }
   public getAllProducts() : Observable<Array<product>>{
    return of (this.products);
   }
   public deleteproducts (id : number): Observable<boolean>{
this.products=  this.products.filter(p=>p.id!=id);
return of(true);

   }
   public searchProducts ( keyword: string) : Observable<product[]>{
let products = this.products.filter(p=>p.name.includes(keyword));
return of(products);
   }
}
