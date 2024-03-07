import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Irregularidad } from 'src/app/models/irregularidad';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  irregularidad: Irregularidad = new Irregularidad;
  constructor(private router:Router,private service:ServiceService){

  }
  ngOnInit(): void {
    this.editar();
  }

  editar(){
    let objetoString=localStorage.getItem("irregularidad");
    if(objetoString){
    this.irregularidad = JSON.parse(objetoString);
    }
  }

  actualizar(irregularidad:Irregularidad){
    this.service.editar(irregularidad)
    .subscribe(data=>{
      this.irregularidad=data;
      alert("Se actualizó con exito");
      this.router.navigate(["listar"])
    })
  }

}
