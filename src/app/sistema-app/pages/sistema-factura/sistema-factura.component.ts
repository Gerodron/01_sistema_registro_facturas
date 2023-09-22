import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActualizadoComponent } from '../../components/dialogos/usuarios-dialog/actualizado/actualizado.component';
import { RegistradoComponent } from '../../components/dialogos/usuarios-dialog/registrado/registrado.component';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { ProductosService } from '../../services/productos.service';
import { ProductosInterface } from '../../interfaces/productos.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendedoresService } from '../../services/vendedores.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-sistema-factura',
  templateUrl: './sistema-factura.component.html',
  styleUrls: ['./sistema-factura.component.css']
})
export class SistemaFacturaComponent implements OnInit {
  newFactura: FormGroup;

  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  vendedores: string[] = [];

  productos: ProductosInterface[] = [];
  displayedColumns: string[] = ['nombre', 'codigo', 'precio', 'cantidad', 'acciones'];
  dataSource!: MatTableDataSource<ProductosInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public productoService: ProductosService,
    private VendedoresService: VendedoresService
  ) {
    this.newFactura = this.fb.group({
      id: [''],
      fecha:['',Validators.required],
      nombreCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      nombreVendedor: ['', Validators.required],
      emailVendedor: ['', Validators.required],
      telefonoVendedor: ['', Validators.required],
      productos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    
    this.route.params.pipe(
      switchMap(({ id }) => id ? this.facturaService.getFacturasID(id) : of(null))
    ).subscribe(
      (factura) => {
        if (factura) {
          this.newFactura.setValue(factura);
          console.log('Listo para editar');
        }
      }
    );

    this.productoService.getList().subscribe(
      (productos) => {
        this.productos = productos.reverse();
        this.dataSource = new MatTableDataSource<ProductosInterface>(this.productos);
        this.inicializarTabla();
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );

    this.VendedoresService.getVendedores().subscribe(
      (vendedores) => {
        this.vendedores = vendedores.map(vendedor => vendedor.nombre);
      },
      (error) => {
        console.error('Error al cargar vendedores:', error);
      }
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    
  }

  private inicializarTabla(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  guardarFactura() {
    if (this.newFactura.valid) {
      if (this.newFactura.value.id) {
        this.facturaService.actualizarFactura(this.newFactura.value).subscribe(
          () => {
            console.log('Factura actualizada');
            this.openMensajeActualizado();
          },
          (error) => console.error('Error al actualizar el registro:', error)
        );
      } else {
        const facturaData = this.newFactura.value;
        this.facturaService.newFactura(facturaData).subscribe(
          (response) => {
            console.log('Factura generada con éxito', response);
            this.openMensajeRegistrado();
          },
          (error) => console.error('Error al generar la factura', error)
        );
      }
    } else {
      this.marcarCamposInvalidos();
    }
  }

  deleteProducto(id: string): void {
    this.productoService.deleteProducto(id)
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

  marcarCamposInvalidos() {
    Object.keys(this.newFactura.controls).forEach((key) => {
      const control = this.newFactura.get(key);
      control?.markAsTouched();
    });
  }

  openMensajeActualizado() {
    this.dialog.open(ActualizadoComponent, {
      height: '150px',
      width: '350px'
    });
  }

  openMensajeRegistrado() {
    this.dialog.open(RegistradoComponent, {
      height: '150px',
      width: '350px'
    });
  }

  agregarListado(id: string) {
    const productoSeleccionado = this.productos.find(producto => producto.id === id);

    if (productoSeleccionado) {
      const productosArray = this.newFactura.get('productos') as FormArray;

      if (productosArray) {
        productosArray.push(this.fb.group(productoSeleccionado));
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.vendedores.filter(option => option.toLowerCase().includes(filterValue));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  vendedorSeleccionado(event: MatAutocompleteSelectedEvent) {
    
    console.log(event)
  }
}


