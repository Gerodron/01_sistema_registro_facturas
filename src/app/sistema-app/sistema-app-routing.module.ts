import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';

import { FacturaComponent } from './pages/factura/factura.component';

import { VendedoresComponent } from './pages/vendedores/vendedores.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ListadoProductosComponent } from './pages/productos/listado-productos/listado-productos.component';
import { ListadoVendedoresComponent } from './pages/vendedores/listado-vendedores/listado-vendedores.component';
import { SistemaFacturaComponent } from './pages/sistema-factura/sistema-factura.component';
import { ListadoFacturasComponent } from './pages/sistema-factura/listado-facturas/listado-facturas.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children: [
      { path: 'factura', component: SistemaFacturaComponent },
      { path: 'factura/editar/:id', component: SistemaFacturaComponent },
      { path: 'factura/info/:id', component: FacturaComponent },
      { path: 'factura/listado-facturas', component: ListadoFacturasComponent }, // Corregir esta línea

      { path: 'vendedores', component: VendedoresComponent },
      { path: 'vendedores/editar/:id', component: VendedoresComponent },
      { path: 'vendedores/list-vendedores', component: ListadoVendedoresComponent },

      { path: 'productos', component: ProductosComponent },
      { path: 'productos/editar/:id', component: ProductosComponent },
      { path: 'productos/list-productos', component: ListadoProductosComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaAppRoutingModule { }
