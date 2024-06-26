import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GestorDto } from 'src/app/models/dto/gestor-dto';
import { ProyectoDto } from 'src/app/models/dto/proyecto-dto';
import { Gestor } from 'src/app/models/gestor';
import { Proyecto } from 'src/app/models/proyecto';
import { GestorService } from 'src/app/services/gestor.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-gestor',
  templateUrl: './form-gestor.component.html',
  styleUrls: ['./form-gestor.component.css'],
})
export class FormGestorComponent implements OnInit {
  proyectos: Proyecto[] = [];
  gestores: Gestor[] = [];

  gestor: GestorDto = new GestorDto();
  proyecto: ProyectoDto = new ProyectoDto();

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  proyectoAsignado: Proyecto = new Proyecto();
  idGestor: number = 0;
  subscription: Subscription = new Subscription();
  gestorSeleccionado: boolean = false;

  constructor(
    private _gestorService: GestorService,
    private _proyectoService: ProyectoService,
    private _router: Router
  ) {
    this.subscription = this._gestorService
      .getGestorSeleccionado()
      .subscribe((gestor) => {
        this.idGestor = gestor.id_gestor;
        this.gestor.nombre = gestor.nombre;
        this.gestor.apellidoP = gestor.apellidoP;
        this.gestor.apellidoM = gestor.apellidoM;
        this.gestor.correo = gestor.correo;
        this.gestor.telefono = gestor.telefono;
        this.gestorSeleccionado = true;
      });
  }

  guardarGestor() {
    if (!this.gestor.correo.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (!(this.gestor.contrasenha.length >= 5)) {
        Swal.fire({
          icon: 'error',
          title: 'La contraseña debe tener al menos 5 caracteres',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this._gestorService.guardar(this.gestor).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Gestor guardado con éxito',
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            this.limpiarFormulario();
            this.updateComponent();
          }, 100);
        });
      }
    }
  }

  actualizarGestor() {
    if (!this.gestor.correo.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'question',
        title: '¿Deseas guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this._gestorService
            .actualizar(this.idGestor, this.gestor)
            .subscribe((result) => {
              this.limpiarFormulario();
              this.updateComponent();
            });
          Swal.fire('¡Cambios guardados con éxito!', '', 'success');
        } else if (result.isDenied) {
          this.limpiarFormulario();
          this.updateComponent();
        }
      });
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
  }

  updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['administrador']).then();
    });
  }

  ngOnInit() {
    this._gestorService
      .getGestores()
      .subscribe((gestores) => (this.gestores = gestores));

    this._proyectoService.getProyectos().subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
  }
}
