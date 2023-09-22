import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacturasInterface } from '../interfaces/facturas.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FacturaService {

  private endPoint : string = environment.endPoint
  
  constructor( private http : HttpClient) { }

  getFactura():Observable<FacturasInterface[]>{
    return this.http.get<FacturasInterface[]>(`${this.endPoint}/facturas`);

  }

  getFacturasID(id : string):Observable<FacturasInterface>{
    return this.http.get<FacturasInterface>(`${this.endPoint}/facturas/${id}`)
  }

  newFactura(factura: FacturasInterface): Observable<FacturasInterface> {
    return this.http.post<FacturasInterface>(`${this.endPoint}/facturas`, factura);
  }

  deleteFactura(id:string):Observable<FacturasInterface>{
    return this.http.delete<FacturasInterface>(`${this.endPoint}/facturas/${id}`)
  }

  deleteProducto(item : FacturasInterface){
    return this.http.delete<FacturasInterface>(`${this.endPoint}/facturas/${item.productos}`)
  }

  actualizarFactura( factura : FacturasInterface ):Observable<FacturasInterface>{
    return this.http.put<FacturasInterface>(`${this.endPoint}/facturas/${factura.id}`, factura)

  }
}
