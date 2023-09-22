import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VendedoresService } from 'src/app/sistema-app/services/vendedores.service';
import { VendedoresInterfaces } from 'src/app/sistema-app/interfaces/vendores.interfaces';
import { MatPaginator } from '@angular/material/paginator'; // Importa MatPaginator

@Component({
  selector: 'app-listado-vendedores',
  templateUrl: './listado-vendedores.component.html',
  styleUrls: ['./listado-vendedores.component.css']
})
export class ListadoVendedoresComponent implements OnInit {

  vendedores: VendedoresInterfaces[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<VendedoresInterfaces>;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild para el paginador

  constructor(private vendedoresService: VendedoresService) {
    this.dataSource = new MatTableDataSource<VendedoresInterfaces>(this.vendedores);
  }

  ngOnInit(): void {
    this.inicializarTabla();
  }

  private inicializarTabla(): void {
    this.vendedoresService.getVendedores()
      .subscribe(
        vendedores => {
          this.vendedores = vendedores.reverse();
          this.dataSource.data = this.vendedores;

          // Vincula el paginador al dataSource
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error('Error al cargar vendedores:', error);
        }
      );
  }

  deleteVendedor(id: string): void {
    this.vendedoresService.deleteVendedor(id)
      .subscribe(
        () => {
          this.vendedores = this.vendedores.filter(vendedor => vendedor.id !== id);
          this.dataSource.data = this.vendedores;
        },
        error => {
          console.error('Error al eliminar vendedor:', error);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
