import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Irregularidad } from 'src/app/models/irregularidad';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  irregularidad: Irregularidad = new Irregularidad;
  constructor(private router:Router,private service:ServiceService){}

  ngOnInit(): void {
  
  }

  crearIrregularidad(irregularidad:Irregularidad){
    this.service.crearIrregularidad(irregularidad)
    .subscribe((data:any)=>{
      alert("Exito")
    })
  }

}
