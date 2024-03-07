
import { Irregularidad } from "./irregularidad";
import { Prestador } from "./prestador";

export class TicketSeguimiento{
    id:number=0;
    nombre:string = "";
    descripcion:string = "";
    fechaGeneracion:string ="";
    fechaFin:string="";
    irregularidades:Irregularidad[]=[];
    prestador:Prestador = new Prestador;
    //id_tipoTicket:TipoTicket = new TipoTicket;
    //id_tipoPrioridad:TipoPrioridad = new TipoPrioridad;
    //id_testatusSeguimiento:TipoTicket = new TipoTicket;
    }
