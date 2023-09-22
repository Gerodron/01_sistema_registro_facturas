import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FacturasInterface } from 'src/app/sistema-app/interfaces/facturas.interface';
import { FacturaService } from '../../../services/factura.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: FacturasInterface[] = [];
  displayedColumns: string[] = ['nombreCliente', 'direccionCliente', 'telefonoCliente', 'nombreVendedor', 'acciones'];
  dataSource: MatTableDataSource<FacturasInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  
  constructor(private facturaService: FacturaService) {
    this.dataSource = new MatTableDataSource<FacturasInterface>(this.facturas);
  }

  ngOnInit(): void {
    this.inicializarTabla();
  }

  private inicializarTabla(): void {
    this.facturaService.getFactura()
      .subscribe(
        facturas => {
          this.facturas = facturas.reverse();
          this.dataSource.data = this.facturas;
          this.dataSource.paginator=this.paginator
        },
        error => {
          console.error('Error al cargar facturas:', error);
        }
      );
  }

  deleteFactura(id: string): void {
    this.facturaService.deleteFactura(id).subscribe(
      () => {
        this.facturas = this.facturas.filter(factura => factura.id !== Number(id));
        this.dataSource.data = this.facturas;
      },
      (error) => {
        console.error('Error al eliminar factura:', error);
        
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
