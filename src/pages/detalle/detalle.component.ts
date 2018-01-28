import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Lista, ListaItem } from '../../app/classes/index';

import { ListaDeseosService } from '../../app/services/lista-deseos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html',
})
export class DetalleComponent implements OnInit {

  idx:number;
  lista:any;

  constructor(
    public navController:NavController,
    public NavParams:NavParams,
    public alertCtrl:AlertController,
    public _listaDeseos:ListaDeseosService
  ) {
      this.idx = this.NavParams.get("idx");
      this.lista = this.NavParams.get("lista");
  }

  ngOnInit() {}

  actualizar(item:ListaItem) {
    item.completado = !item.completado;
    let todosMarcados:boolean = true;
    for (let item of this.lista.items) {
      if (!item.completado) {
        todosMarcados = false;
        break;
      }
    }
    this.lista.terminada = todosMarcados;
    this._listaDeseos.actualizarData();
  }

  borrarItem() {
    let confirm = this.alertCtrl.create({
      title: `Eliminar ${ this.lista.nombre}`,
      message: `¿Deseas eliminar la lista ${ this.lista.nombre }?`,
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Aceptar pulsado');
            this._listaDeseos.eliminarLista(this.idx);
            this.navController.pop();
          }
        },
        'Cancelar']
    });
    confirm.present();
  }
}
