import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActualizadoComponent } from '../../components/dialogos/usuarios-dialog/actualizado/actualizado.component';
import { RegistradoComponent } from '../../components/dialogos/usuarios-dialog/registrado/registrado.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  newProducto: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.newProducto = this.fb.group({
      id: '',
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      codigo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => id ? this.productosService.getProductoID(id) : of(null))
    ).subscribe(
      (producto) => {
        if (producto) {
          this.newProducto.setValue(producto);
          console.log('Listo para editar');
        }
      }
    );
  }

  sistemaProductos() {
    if (this.newProducto.valid) {
      if (this.newProducto.value.id) {
        // ACTUALIZAR PRODUCTO
        this.productosService.actualizarProducto(this.newProducto.value).subscribe(
          () => console.log('Registro actualizado')
        );
        this.openMensajeActualizado()
      } else {
        // CREAR NUEVO PRODUCTO
        this.productosService.newProducto(this.newProducto.value).subscribe(
          () => console.log('Registro creado')
        );
        this.openMensajeRegistrado()
      }
    }
  }

  openMensajeActualizado(){
    this.dialog.open(ActualizadoComponent, {
      height:'150px',
      width:'350px'
    })
  }

  openMensajeRegistrado(){
    this.dialog.open(RegistradoComponent,{
      height:'150px',
      width:'350px'
    })
  }
}
