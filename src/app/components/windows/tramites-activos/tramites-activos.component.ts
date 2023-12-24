import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tramites-activos',
  templateUrl: './tramites-activos.component.html',
  styleUrls: ['./tramites-activos.component.css']
})
export class TramitesActivosComponent {

  constructor(private _router: Router) {
  }

  goToGestionPorProyecto() {
    this._router.navigate(['Principal/gestion']).then();
  }

}
