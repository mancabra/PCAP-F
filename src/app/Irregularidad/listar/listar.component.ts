import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Irregularidad } from 'src/app/models/irregularidad';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  irregularidades:Irregularidad[]=[];
  constructor(private service:ServiceService,private router:Router ){}

  ngOnInit() {
    this.service.obtenerIrregularidades()
    .subscribe(data=>{
      this.irregularidades=data;
    });
  }

  editar(irregularidad:Irregularidad){
    localStorage.setItem("irregularidad",JSON.stringify(irregularidad));
    this.router.navigate(["edit"])
  }

  eliminar(irregularidad:Irregularidad){
    this.service.eliminar(irregularidad.id_irregularidad)
    .subscribe(data=>{
      alert(data.mensaje);
      this.router.navigate(["listar"])
    })
  }


}
