import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';  // Importa MatPaginator
import { ProductosInterface } from 'src/app/sistema-app/interfaces/productos.interface';
import { ProductosService } from 'src/app/sistema-app/services/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {
  productos: ProductosInterface[] = [];
  displayedColumns: string[] = ['nombre', 'codigo', 'precio', 'cantidad', 'acciones'];
  dataSource: MatTableDataSource<ProductosInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private productosService: ProductosService) {
    this.dataSource = new MatTableDataSource<ProductosInterface>(this.productos);
  }

  ngOnInit(): void {
    this.inicializarTabla();
  }

  private inicializarTabla(): void {
    this.productosService.getList()
      .subscribe(
        productos => {
          this.productos = productos.reverse();
          this.dataSource.data = this.productos;
          this.dataSource.paginator = this.paginator;  // Asigna el paginador
        },
        error => {
          console.error('Error al cargar productos:', error);
        }
      );
  }

  deleteProducto(id: string): void {
    this.productosService.deleteProducto(id)
      .subscribe(
        () => {
          this.productos = this.productos.filter(producto => producto.id !== id);
          this.dataSource.data = this.productos;
        },
        error => {
          console.error('Error al eliminar producto:', error);
        }
      );
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
