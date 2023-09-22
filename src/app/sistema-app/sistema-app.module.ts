import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaAppRoutingModule } from './sistema-app-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { MaterialModule } from './material/material.module';
import { RegistradoComponent } from './components/dialogos/usuarios-dialog/registrado/registrado.component';
import { ListadoProductosComponent } from './pages/productos/listado-productos/listado-productos.component';
import { VendedoresComponent } from './pages/vendedores/vendedores.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ListadoVendedoresComponent } from './pages/vendedores/listado-vendedores/listado-vendedores.component';
import { SistemaFacturaComponent } from './pages/sistema-factura/sistema-factura.component';
import { ListadoFacturasComponent } from './pages/sistema-factura/listado-facturas/listado-facturas.component';
import { ActualizadoComponent } from './components/dialogos/usuarios-dialog/actualizado/actualizado.component';



@NgModule({
  declarations: [
    InicioComponent,
    FacturaComponent,
    RegistradoComponent,
    ListadoProductosComponent,
    VendedoresComponent,
    ProductosComponent,
    ListadoVendedoresComponent,
    SistemaFacturaComponent,
    ListadoFacturasComponent,
    FacturaComponent,
    ActualizadoComponent,

  ],
  imports: [
    CommonModule,
    SistemaAppRoutingModule,
    MaterialModule,

  ]
})
export class SistemaAppModule { }
