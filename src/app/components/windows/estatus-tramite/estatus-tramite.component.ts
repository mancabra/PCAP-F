import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import {EstatusTramite} from "../../../models/estatus-tramite";
import {Router} from "@angular/router";
import {EstatusService} from "../../../services/estatus.service";

@Component({
  selector: 'app-estatus-tramite',
  templateUrl: './estatus-tramite.component.html',
  styleUrls: ['./estatus-tramite.component.css']
})
export class EstatusTramiteComponent implements OnInit {
  estatus: EstatusTramite = new EstatusTramite();
  progreso: number = 0;
  strProgreso: string = '';

  constructor(private _router: Router, private _estatusService: EstatusService) { }

  setProgreso(estatusTramite: EstatusTramite) {
    const ICON = document.getElementById("progress-icon");
    if (ICON != null) {
      ICON.classList.forEach(clase => {
        if (clase.includes("bi-")) {
          ICON.classList.remove(clase);
        }
      })
    }

    if (estatusTramite.estatus == 1) {
      this.progreso = 50;
      this.strProgreso = 'EN CURSO';
      if (ICON != null) {
        ICON.classList.add("bi-clock-fill");
      }
    } else if (estatusTramite.estatus == 2) {
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
    this._estatusService.getEstatus().subscribe(estatus => this.estatus = estatus);

    setTimeout(() => {
      this.setProgreso(this.estatus);
    }, 100);

  }
}
