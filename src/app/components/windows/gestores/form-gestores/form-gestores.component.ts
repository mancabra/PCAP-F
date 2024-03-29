import {Component, OnInit} from '@angular/core';
import {PrestadorDto} from "../../../../models/dto/prestador-dto";
import {PrestadorService} from "../../../../services/prestador.service";
import {Router} from "@angular/router";
import {Prestador} from "../../../../models/prestador";
import {ProyectoService} from "../../../../services/proyecto.service";
import {Proyecto} from "../../../../models/proyecto";
import {Subscription} from "rxjs";
import {ProyectoDto} from "../../../../models/dto/proyecto-dto";
import {GestorService} from "../../../../services/gestor.service";
import {Gestor} from "../../../../models/gestor";
import {GestorDto} from "../../../../models/dto/gestor-dto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-gestores',
  templateUrl: './form-gestores.component.html',
  styleUrls: ['./form-gestores.component.css']
})
export class FormGestoresComponent implements OnInit {
  proyectos: Proyecto[] = [];
  gestores: Gestor[] =[];

  gestor: GestorDto = new GestorDto();
  proyecto: ProyectoDto = new ProyectoDto();

  nombre: string = "";
  apellido: string = "";
  email: string = "";
  password: string = "";
  proyectoAsignado: Proyecto = new Proyecto();
  idGestor: number = 0;
  subscription: Subscription = new Subscription();
  gestorSeleccionado: boolean = false;

  constructor(private _gestorService: GestorService, private _proyectoService: ProyectoService, private _router: Router) {
    this.subscription = this._gestorService.getGestorSeleccionado().subscribe(gestor => {
      this.idGestor = gestor.id;
      this.nombre = gestor.nombre;
      this.apellido = gestor.apellido;
      this.email = gestor.email;
      this.gestorSeleccionado = true;
    });
  }

  guardarGestor() {
    this.gestor.nombre = this.nombre;
    this.gestor.apellido = this.apellido;

    if (!this.email.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.gestor.email = this.email;
    }

    if (!(this.password.length >= 5)) {
      Swal.fire({
        icon: 'error',
        title: 'La contraseña debe tener al menos 5 caracteres',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.gestor.password = this.password;
    }

    this._gestorService.guardar(this.gestor).subscribe();

    Swal.fire({
      icon: 'success',
      title: 'Gestor guardado con éxito',
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      this.limpiarFormulario();
      this.updateComponent();
    },100);
  }

  actualizarGestor() {
    this.gestor.nombre = this.nombre;
    this.gestor.apellido = this.apellido;

    if (!this.email.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.gestor.email = this.email;
    }

    if (!(this.password.length >= 5)) {
      Swal.fire({
        icon: 'error',
        title: 'La contraseña debe tener al menos 5 caracteres',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.gestor.password = this.password;
    }

    Swal.fire({
      icon: 'question',
      title: '¿Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      denyButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this._gestorService.actualizar(this.idGestor, this.gestor).subscribe(result => {
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

  limpiarFormulario() {
    this.nombre = "";
    this.apellido = "";
    this.email = "";
  }

  updateComponent() {
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this._router.navigate(['Principal/gestores']).then()
    });
  }

  ngOnInit() {
    this._gestorService.getGestores().subscribe(gestores => this.gestores = gestores);

    this._proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }
}
