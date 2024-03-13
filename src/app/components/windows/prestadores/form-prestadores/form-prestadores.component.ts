import {Component, OnInit} from '@angular/core';
import {PrestadorDto} from "../../../../models/dto/prestador-dto";
import {PrestadorService} from "../../../../services/prestador.service";
import {Router} from "@angular/router";
import {Prestador} from "../../../../models/prestador";
import {ProyectoService} from "../../../../services/proyecto.service";
import {Proyecto} from "../../../../models/proyecto";
import {Subscription} from "rxjs";
import {ProyectoDto} from "../../../../models/dto/proyecto-dto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-prestadores',
  templateUrl: './form-prestadores.component.html',
  styleUrls: ['./form-prestadores.component.css']
})
export class FormPrestadoresComponent implements OnInit {
  proyectos: Proyecto[] = [];
  prestadores: Prestador[] = [];

  prestador: PrestadorDto = new PrestadorDto();
  proyecto: ProyectoDto = new ProyectoDto();

  nombre: string = "";
  apellido: string = "";
  email: string = "";
  proyectoAsignado: Proyecto = new Proyecto();
  idPrestador: number = 0;
  subscription: Subscription = new Subscription();
  prestadorSeleccionado: boolean = false;

  constructor(private _prestadorService: PrestadorService, private _proyectoService: ProyectoService, private _router: Router) {
    this.subscription = this._prestadorService.getPrestadorSeleccionado().subscribe(prestador => {
      this.idPrestador = prestador.id;
      this.nombre = prestador.nombre;
      this.apellido = prestador.apellido;
      this.email = prestador.email;
      this.prestadorSeleccionado = true;

      let nombreProyecto = this.proyectos.find(proyecto => proyecto.prestadoresDeServicio.includes(prestador))?.nombre || "";
      this.getProyecto(nombreProyecto);
    });
  }

  guardarPrestador() {
    this.prestador.nombre = this.nombre;
    this.prestador.apellido = this.apellido;

    if (!this.email.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500
      }).then();
    } else {
      this.prestador.email = this.email;
    }

    this._prestadorService.guardar(this.prestador).subscribe();

    this.asignarProyecto();

    Swal.fire({
      icon: 'success',
      title: 'Prestador guardado con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then();

    setTimeout(() => {
      this.limpiarFormulario();
      this.updateComponent();
    },100);
  }

  actualizarPrestador() {
    this.prestador.nombre = this.nombre;
    this.prestador.apellido = this.apellido;

    if (!this.email.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500
      }).then();
    } else {
      this.prestador.email = this.email;
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
        this._prestadorService.actualizar(this.idPrestador, this.prestador).subscribe(result => {
          this.asignarProyecto();
          setTimeout(() => {
            this.limpiarFormulario();
            this.updateComponent();
          },100);
        });
        Swal.fire('¡Cambios guardados con éxito!', '', 'success');
      } else if (result.isDenied) {
        this.limpiarFormulario();
        this.updateComponent();
      }
    });
  }

  proyectoSeleccionado() {
    const proyectos = document.getElementById('proyecto') as HTMLSelectElement;
    const proyectoSeleccionado = proyectos.value;

    let proyecto= this.proyectos.find(proyecto => {
      return proyecto.nombre === proyectoSeleccionado;
    });

    if (proyecto != undefined) {
      this.proyectoAsignado = proyecto;
    }

    setTimeout(() => {console.log(this.proyectoAsignado)}, 100);
  }

  asignarProyecto() {
    this.proyectoSeleccionado();

    setTimeout(() => {
      this.proyecto.nombre = this.proyectoAsignado.nombre;
      this.proyecto.representante = this.proyectoAsignado.representante;
      this.proyecto.fechaInicio = this.proyectoAsignado.fechaInicio;
      this.proyecto.fechaFin = this.proyectoAsignado.fechaFin;

      //let emailsPrestadores = this.proyectoAsignado.prestadoresDeServicio.map(p => p.email);
      //emailsPrestadores.push(this.email);
      //this.proyecto.emailsPrestadores = emailsPrestadores;
      this._proyectoService.actualizar(this.proyectoAsignado.id, this.proyecto).subscribe();
    }, 100);
  }

  getProyecto(nombreProyecto: string) {
    const proyectos = document.getElementById('proyecto') as HTMLSelectElement;

    let proyecto = this.proyectos.find(proyecto => {
      return proyecto.nombre === nombreProyecto;
    });

    let id = 0;
    if (proyecto != undefined) {
      id = this.proyectos.indexOf(proyecto);
    }

    proyectos.options[id + 1].selected = true;
  }

  limpiarFormulario() {
    this.nombre = "";
    this.apellido = "";
    this.email = "";
  }

  updateComponent() {
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this._router.navigate(['Principal/prestadores']).then()
    });
  }

  ngOnInit() {
    this._prestadorService.getPrestadores().subscribe(prestadores => {
      this.prestadores = prestadores;
    });

    this._proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }
}
