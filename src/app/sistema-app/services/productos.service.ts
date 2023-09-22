import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductosInterface } from '../interfaces/productos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private endPoint : string = environment.endPoint

  constructor(private http : HttpClient) { }

  getList(): Observable<ProductosInterface[]> {
    return this.http.get<ProductosInterface[]>(`${this.endPoint}/productos`)
  }

  getProductoID(id:string){
    return this.http.get<ProductosInterface>(`${this.endPoint}/productos/${id}`)
  }

  newProducto(producto:ProductosInterface): Observable<ProductosInterface> {
    return this.http.post<ProductosInterface>(`${this.endPoint}/productos`, producto)
  }

  deleteProducto(id:string): Observable<ProductosInterface>{
    return this.http.delete<ProductosInterface>(`${this.endPoint}/productos/${id}`)
  }


  actualizarProducto(producto:ProductosInterface): Observable<ProductosInterface>{
    return this.http.put<ProductosInterface>(`${this.endPoint}/productos/${producto.id}`, producto)
  }
}
