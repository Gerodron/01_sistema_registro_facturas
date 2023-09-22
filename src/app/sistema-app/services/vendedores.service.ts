import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VendedoresInterfaces } from '../interfaces/vendores.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {
  
  private endPoint : string = environment.endPoint

  constructor(private http : HttpClient) { }
  
  getVendedores(): Observable<VendedoresInterfaces[]> {
    return this.http.get<VendedoresInterfaces[]>(`${this.endPoint}/vendedores`)
  }

  getVendedoresFiltrado(termino:string): Observable<VendedoresInterfaces[]> {
    return this.http.get<VendedoresInterfaces[]>(`${this.endPoint}/vendedores?q=${termino}&_limit=5`)
  }
  getVendedorID(id:string):Observable<VendedoresInterfaces> {
    return this.http.get<VendedoresInterfaces>(`${this.endPoint}/vendedores/${id}`)
  }

  newVendedor(vendedor:VendedoresInterfaces): Observable<VendedoresInterfaces> {
    return this.http.post<VendedoresInterfaces>(`${this.endPoint}/vendedores`, vendedor)
  }

  deleteVendedor(id:string): Observable<VendedoresInterfaces>{
    return this.http.delete<VendedoresInterfaces>(`${this.endPoint}/vendedores/${id}`)
  }


  actualizarVendedor(vendedor:VendedoresInterfaces): Observable<VendedoresInterfaces>{
    return this.http.put<VendedoresInterfaces>(`${this.endPoint}/vendedores/${vendedor.id}`, vendedor)
  }


  getVendedorPorNombre(nombre: string): Observable<any> {
    const url = `${this.endPoint}/vendedores?nombre=${nombre}`;
    return this.http.get(url);
  }
  
}
