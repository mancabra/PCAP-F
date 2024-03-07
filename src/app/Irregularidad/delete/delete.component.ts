import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Irregularidad } from 'src/app/models/irregularidad';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit{
  irregularidad: Irregularidad = new Irregularidad;
  constructor(private router:Router,private service:ServiceService){}

  ngOnInit(): void {
    
  }

}
