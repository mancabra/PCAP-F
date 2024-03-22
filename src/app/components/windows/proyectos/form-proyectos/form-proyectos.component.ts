import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProyectoDto} from "../../../../models/dto/proyecto-dto";
import {ProyectoService} from "../../../../services/proyecto.service";
import {Gestor} from "../../../../models/gestor";
import {Router} from "@angular/router";
import {Proyecto} from "../../../../models/proyecto";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  idProyecto: number = 0;
  gestores: Gestor[] = [];
  proyecto: string = "";
  representante: string ="";
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  proyectoDto: ProyectoDto = new ProyectoDto();
  proyectoSeleccionado: boolean = false;

  constructor(private _proyectoService: ProyectoService, private _router: Router) {
    this.subscription = this._proyectoService.getProyectoSeleccionado().subscribe(proyecto => {
      this.idProyecto = proyecto.id;
      this.proyecto = proyecto.nombre;
      this.fechaInicio = new Date(proyecto.fechaInicio);
      this.fechaFin = new Date(proyecto.fechaFin);
      this.representante = proyecto.representante;
      this.proyectoSeleccionado = true;
      this.getGestor(proyecto.representante.nombre + "" + proyecto.representante.apellido);
    });
  }

  getGestor(nombre: string): void {
    const gestores = document.getElementById('gestores') as HTMLSelectElement;

    let gestor = this.gestores.find(gestor => {
      let nombreCompleto = gestor.nombre + "" + gestor.apellido;
      return nombreCompleto === nombre;
    });

    let id = 0;
    if (gestor != undefined) {
      id = this.gestores.indexOf(gestor);
    }

    gestores.options[id + 1].selected = true;
  }
  /*getEmailRepresentante(): void {
    const gestores = document.getElementById('gestores') as HTMLSelectElement;
    const gestorSeleccionado = gestores.value;

    let gestor = this.gestores.find(gestor => {
      let nombreCompleto = gestor.nombre + "" + gestor.apellido;
      return nombreCompleto === gestorSeleccionado;
    });

    this.emailRepresentante = gestor?.email || "";
  }*/

  guardarProyecto(): void {
    //this.getEmailRepresentante();
    this.proyectoDto.nombre = this.proyecto;
    this.proyectoDto.representante = this.representante;

    if (this.fechaInicio > this.fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Periodo de tiempo inválido. Por favor, verifique las fechas ingresadas',
        showConfirmButton: false,
        timer: 1500
      }).then();
      return;
    } else {
      this.proyectoDto.fechaInicio = this.fechaInicio.toISOString();
      this.proyectoDto.fechaFin = this.fechaFin.toISOString();
    }

    this._proyectoService.guardar(this.proyectoDto).subscribe();

    Swal.fire({
      icon: 'success',
      title: 'Proyecto guardado con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then();

    setTimeout(() => {
      //this.limpiarFormulario();
      this.updateComponent();
    }, 100);
  }

  actualizarProyecto(): void {
    //this.getEmailRepresentante();
    this.proyectoDto.nombre = this.proyecto;
    this.proyectoDto.representante = this.representante;

    if (this.fechaInicio > this.fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Periodo de tiempo inválido. Por favor, verifique las fechas ingresadas',
        showConfirmButton: false,
        timer: 1500
      }).then();
      return;
    } else {
      this.proyectoDto.fechaInicio = this.fechaInicio.toISOString();
      this.proyectoDto.fechaFin = this.fechaFin.toISOString();
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
        this._proyectoService.actualizar(this.idProyecto, this.proyectoDto).subscribe(result => {
          setTimeout(() => {
            //this.limpiarFormulario();
            this.updateComponent();
          }, 100);
        });
        Swal.fire('¡Cambios guardados con éxito!', '', 'success').then();
      } else if (result.isDenied) {
        //this.limpiarFormulario();
        this.updateComponent();
      }
    });
  }

  limpiarFormulario(): void {
    const gestores = document.getElementById('gestores') as HTMLSelectElement;
    const defaultOption = gestores.options[0];
    defaultOption.selected = true;

    this.proyecto = "";
    this.representante = "";
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
  }

  updateComponent(): void {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['Principal/proyectos']).then();
    });
  }

  ngOnInit(): void {
    /*this._proyectoService.getGestores().subscribe(gestores => {
      this.gestores = gestores;
    });*/
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
