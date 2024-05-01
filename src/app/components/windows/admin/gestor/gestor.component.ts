import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gestor } from 'src/app/models/gestor';
import { GestorService } from 'src/app/services/gestor.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css'],
})
export class GestorComponent {
  p: number = 1;
  gestores: Gestor[] = [];
  constructor(
    private _proyectoService: ProyectoService,
    private _gestorService: GestorService,
    private _router: Router
  ) {}

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
    }).then((result) => {
      if (result.isConfirmed) {
        this._gestorService.eliminar(id).subscribe(() => {
          this._gestorService
            .getGestores()
            .subscribe((gestores) => (this.gestores = gestores));
        });
        Swal.fire('¡Gestor eliminado!', '', 'success');
      }
    });
  }

  ngOnInit() {
    this._gestorService
      .getGestores()
      .subscribe((gestores) => (this.gestores = gestores));
  }
}
