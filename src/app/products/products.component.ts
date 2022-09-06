import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<product>;
  searchFormGroup! : FormGroup
 

  constructor(private productService : ProductService, private fb : FormBuilder,
    public authService:AuthenticationService) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(null)

    });


     this.productService.getAllProducts().subscribe({
      next : (data:any[])=> {
       this.products= data; 
      },
     

    });
 
  }
  deleteProducts(p: any){
    let conf =confirm("are you sure?");
    if (conf==false) return;
    let index = this.products.indexOf(p);
    this.products.splice(index,1);

  }
  FunctionSearch(){
    let keyword =this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next:(data:product[])=>{
        this.products=data;
      }
    })
  }

}
