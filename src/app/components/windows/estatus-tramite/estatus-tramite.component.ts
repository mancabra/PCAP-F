import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import {EstatusTramite} from "../../../models/estatus-tramite";
import {Router} from "@angular/router";
import {EstatusService} from "../../../services/estatus.service";
import {GestionService} from "../../../services/gestion.service";
import {Subscriber} from "rxjs";
import {Prestador} from "../../../models/prestador";
import { Irregularidad } from 'src/app/models/irregularidad';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-estatus-tramite',
  templateUrl: './estatus-tramite.component.html',
  styleUrls: ['./estatus-tramite.component.css']
})
export class EstatusTramiteComponent implements OnInit {
  idPrestador: number = 0;
  idTramite: number = 0;
  prestador: Prestador = new Prestador();
  progreso: number = 0;
  strProgreso: string = '';
  listaIrregularidades: any[] = [];
  irregularidad: Irregularidad = new Irregularidad();
  descripcion: string = "";
  irregularidadEncontrada: boolean = false;



  constructor(private _router: Router, private _gestionService: GestionService, private _estatusService: EstatusService,private _irregularidadService: ServiceService) { }

  setProgreso(estatus: number) {
    const ICON = document.getElementById("progress-icon");
    if (ICON != null) {
      ICON.classList.forEach(clase => {
        if (clase.includes("bi-")) {
          ICON.classList.remove(clase);
        }
      })
    }

    if (estatus == 1) {
      this.progreso = 50;
      this.strProgreso = 'EN CURSO';
      if (ICON != null) {
        ICON.classList.add("bi-clock-fill");
      }
    } else if (estatus == 2) {
      this.progreso = 100;
      this.strProgreso = 'COMPLETADO';
      if (ICON != null) {
        ICON.classList.add("bi-check-circle-fill");
      }
    } else {
      this.strProgreso = 'INACTIVO';
      if (ICON != null) {
        ICON.classList.add("bi-dash-circle-fill");
      }
    }
  }

  ngOnInit() {
    this.idTramite = this._gestionService.getTramiteID();
    this.idPrestador = this._gestionService.getPrestadorID();
    this.obtenerIrregularidadesPorTramite(this.idTramite);
    /*setTimeout(() => {
      debugger;
      this._gestionService.getPrestador(this.idPrestador).subscribe(prestador => this.prestador = prestador);
    }, 10);

    setTimeout(() => {
      console.log(this.idPrestador);
    }, 100);

    setTimeout(() => {
      console.log(this.prestador);
      //this.setProgreso(this.prestador.tramites[0].estatus);
    }, 100);*/

  }

  obtenerIrregularidadesPorTramite(id:number){
    this._irregularidadService.obtenerPorTramite(id).subscribe(data=>{
      this.listaIrregularidades=data;
    });
  }
  nuevo(){
    this._router.navigate(["add"]);
  }

  seleccionarIrregularidad(irregularidad:Irregularidad){
    this.irregularidadEncontrada = true;
    this.irregularidad=irregularidad;
  }
  eliminarIrregularidad(irregularidad:Irregularidad){
    this._irregularidadService.eliminar(irregularidad.id_irregularidad).subscribe(data=>{
      this.obtenerIrregularidadesPorTramite(this.idTramite);
    });
  }
  crearIrregularidad(irregularidad:Irregularidad){
    irregularidad.id_tramite=this.idTramite;
    this._irregularidadService.crearIrregularidad(irregularidad).subscribe(data=>{
      this.obtenerIrregularidadesPorTramite(this.idTramite);
      this.limpiarFormulario();
    });
  }
  modificarIrregularidad(irregularidad:Irregularidad){
    this._irregularidadService.editar(irregularidad).subscribe(data=>{
      this.obtenerIrregularidadesPorTramite(this.idTramite);
      this.limpiarFormulario();
    });
  }
  limpiarFormulario(){
    this.irregularidad = new Irregularidad();
    this.irregularidadEncontrada = false;
  }
  

}
