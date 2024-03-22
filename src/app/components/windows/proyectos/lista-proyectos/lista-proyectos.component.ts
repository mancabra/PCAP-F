import {Component, OnInit} from '@angular/core';
import {Proyecto} from "../../../../models/proyecto";
import {ProyectoService} from "../../../../services/proyecto.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {
  nombreProyecto: string = "";
  proyecto: Proyecto = new Proyecto();
  proyectos: Proyecto[] = [];
  proyectoEncontrado: boolean = false;

  constructor(private _proyectoService: ProyectoService) {
  }

  seleccionarProyecto(proyecto: Proyecto) {
    this._proyectoService.seleccionar(proyecto);
  }

  buscarProyecto() {
    let busqueda = this.proyectos.find(
      proyecto => proyecto.nombre.toLowerCase() === this.nombreProyecto.toLowerCase()
    );
    if (busqueda != undefined) {
      this.proyecto = busqueda;
      this.proyectoEncontrado = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se encontraron resultados',
        showConfirmButton: false,
        timer: 1500
      });
      this.proyectoEncontrado = false;
    }
  }

  eliminarProyecto(id: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea eliminar el proyecto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this._proyectoService.eliminar(id).subscribe(proyecto => {
          this.actualizarListaProyectos();
        });
        Swal.fire('¡Proyecto eliminado!', '', 'success').then();
      }
    });
  }

  ngOnInit(): void {
    this.actualizarListaProyectos();
  }

  actualizarListaProyectos(){
    this._proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

}
