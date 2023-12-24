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
  idEstatus: number = 0;
  estatus: EstatusTramite = new EstatusTramite();

  constructor(private _router: Router, private _estatusService: EstatusService) { }

  ngOnInit() {
    /*
    setTimeout(() => {
      this._estatusService.getEstatus(this.idEstatus).subscribe(est => this.estatus = est);
    }, 100);
     */
  }
}
