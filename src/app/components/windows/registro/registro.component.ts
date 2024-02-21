import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private _router: Router) { }

  goToProyectos() {
    this._router.navigate(['Principal/proyectos']).then();
  }

  goToPrestadores() {
    this._router.navigate(['Principal/prestadores']).then();
  }

  goToGestores() {
    this._router.navigate(['Principal/gestores']).then();
  }
}
