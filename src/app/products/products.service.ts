import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private static productslist: Product[] = null;
    private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        if( ! ProductsService.productslist )
        {
          this.http.get<Product[]>('https://localhost:7074/Products').subscribe(data => {

            console.log(data);
                ProductsService.productslist = data;
                
                this.products$.next(ProductsService.productslist);
            });
        }
        else
        {
            this.products$.next(ProductsService.productslist);
        }

        return this.products$;
    }

    create(prod: Product): Observable<Product[]> {

      this.http.post('https://localhost:7074/Products', prod).subscribe(data => {


        console.log('Product added successfully:', data);
      });
      error => {
        // Error callback
        console.error('Error adding product:', error);
      }



      this.products$.next(ProductsService.productslist);
      ProductsService.productslist.push(prod);
      return this.products$;
    }

  update(prod: Product): Observable<Product[]>{

    console.log('prodprod:', prod);
        ProductsService.productslist.forEach(element => {
            if(element.id == prod.id)
            {
              console.log('element:', element);
              console.log('prod:', prod);
                element.name = prod.name;
                element.category = prod.category;
                element.code = prod.code;
                element.description = prod.description;
              element.image = prod.image;
                element.inventoryStatus = prod.inventoryStatus;
                element.price = prod.price;
                element.quantity = prod.quantity;
              element.rating = prod.rating;
            }
         
        this.http.put<Product>('https://localhost:7074/Products/' + element.id, element).subscribe(data => {
        console.log('Updated successfully:', data);
          });
          error => {
            // Error callback
            console.error('Error adding product:', error);
          }

        });

        this.products$.next(ProductsService.productslist);
        return this.products$;
    }


  delete(id: number): Observable<Product[]>{

    console.log('Product added successfully: https://localhost:7074/Products/' + id);
    this.http.delete<Product[]>('https://localhost:7074/Products/' + id).subscribe(
      {
        next: data => {
          console.log('Delete successful');
          ProductsService.productslist = ProductsService.productslist.filter(value => { return value.id !== id });
          this.products$.next(ProductsService.productslist);
      },
        error: error =>
      {        
        console.error('There was an error!', error);
      }
    });
    return this.products$;
    }
}
