import {Component, OnInit} from '@angular/core';
import {ProyectoService} from "../../../../services/proyecto.service";
import {Router} from "@angular/router";
import {Prestador} from "../../../../models/prestador";
import {PrestadorService} from "../../../../services/prestador.service";
import {Gestor} from "../../../../models/gestor";
import {GestorService} from "../../../../services/gestor.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-gestores',
  templateUrl: './lista-gestores.component.html',
  styleUrls: ['./lista-gestores.component.css']
})
export class ListaGestoresComponent implements OnInit {
  p: number = 1;
  gestores: Gestor[] = [];
  constructor(private _proyectoService: ProyectoService, private _gestorService: GestorService, private _router: Router) {
  }

  seleccionarGestor(gestor: Gestor) {
    this._gestorService.seleccionar(gestor);
  }

  eliminarGestor(id: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea eliminar al gestor?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this._gestorService.eliminar(id).subscribe(
          () => {
            this._gestorService.getGestores().subscribe(gestores => this.gestores = gestores);
          }
        );
        Swal.fire('¡Gestor eliminado!', '', 'success');
      }
    });
  }

  ngOnInit() {
    this._gestorService.getGestores().subscribe(gestores => this.gestores = gestores);
  }

}
