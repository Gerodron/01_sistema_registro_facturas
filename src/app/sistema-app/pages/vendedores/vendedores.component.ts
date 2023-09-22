import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendedoresService } from '../../services/vendedores.service';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegistradoComponent } from '../../components/dialogos/usuarios-dialog/registrado/registrado.component';
import { ActualizadoComponent } from '../../components/dialogos/usuarios-dialog/actualizado/actualizado.component';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  newVendedor:FormGroup;

  constructor(private fb : FormBuilder, private route : ActivatedRoute, private vendedoresService : VendedoresService, public dialog: MatDialog) {
    this.newVendedor=this.fb.group({
      id:'',
      nombre:['', Validators.required],
      email:['', Validators.required],
      telefono:['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => id ? this.vendedoresService.getVendedorID(id) : of(null))
    ).subscribe(
      (vendedor) => {
        if (vendedor) {
          this.newVendedor.setValue(vendedor);
          console.log('Listo para editar');
        }
      }
    );
  }

  sistemaVendedores(){
    if(this.newVendedor.valid){
      if(this.newVendedor.value.id){
        //ACTUALIZAR
        this.vendedoresService.actualizarVendedor(this.newVendedor.value.id).subscribe( 
          () => console.log('Registro actualizado')
         )
        this.openMensajeActualizado()
      }else{
        //CREAR
        this.vendedoresService.newVendedor(this.newVendedor.value).subscribe(
          () => console.log('Registro creado')
        )
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
