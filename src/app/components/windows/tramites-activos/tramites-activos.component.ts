import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tramites-activos',
  templateUrl: './tramites-activos.component.html',
  styleUrls: ['./tramites-activos.component.css'],
})
export class TramitesActivosComponent {
  constructor(private _router: Router) {}

  goToGestionPorProyecto() {
    this._router.navigate(['Principal/gestion/proyectos']).then();
  }

  goToGestionPorPrestador() {
    this._router.navigate(['Principal/gestion/prestadores']).then();
  }

  goToGestionPorPrioridad() {
    this._router.navigate(['Principal/gestion/prioridad']).then();
  }

  goToTramite() {
    this._router.navigate(['Principal/tramites/gestion']).then();
  }
}
