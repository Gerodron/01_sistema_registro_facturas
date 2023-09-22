import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { FacturasInterface } from '../../interfaces/facturas.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  
  datosFactura!: FacturasInterface;
  displayedColumns: string[] = ['codigo', 'nombre', 'precio', 'cantidad', 'subtotal'];

  constructor(private facturaService: FacturaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => (id ? this.facturaService.getFacturasID(id) : of(null)))
      )
      .subscribe(
        (factura) => {
          if (factura) {
            this.datosFactura = factura;
            console.log(this.datosFactura)
          }
        },
        (error) => {
          console.error('Error al cargar factura:', error);
        }
      );
  }

  calcularSubtotal(item: any): number {
    return item.cantidad * item.precio;
  }

  calcularTotal() {
    let total = 0;
    this.datosFactura.productos.forEach(item => {
      total += this.calcularSubtotal(item);
    });
    return total;
  }

}
