import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  editar: boolean = false;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    locale: esLocale,
    editable: false,
    selectable: true,
    height: 650,
    aspectRatio: 2,
    eventColor: 'rgb(218, 202, 168)',
    eventClick: this.handleEventClick.bind(this),
  };

  events: any[] = [];

  user!: any;

  eventEdit: any = {
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
    url: '',
  };

  event: any = {
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
    url: '',
  };

  constructor(
    private eventService: EventService,
    private userService: AuthService
  ) {}

  handleEventClick(clickedEvent: EventClickArg) {
    var eventObj = clickedEvent.event;
    this.eventEdit = {
      id: eventObj.id,
      title: eventObj.title,
      start: eventObj.start,
      end: eventObj.end,
      description: eventObj.extendedProps['description'],
      url: eventObj.url,
    };
    $('#myModal').modal('show');
  }

  guardarEvento() {
    this.eventService
      .saveEvent(this.event, this.user.id_usuario)
      .subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Evento guardado con éxito',
          showConfirmButton: false,
          timer: 1500,
        }).then();
      });
    window.location.reload();
  }

  actualizarEvento() {
    if (!this.editar) {
      this.editar = true;
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
          this.eventService
            .updateEvent(this.eventEdit, this.eventEdit.id)
            .subscribe((result) => {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            });
          Swal.fire('¡Cambios guardados con éxito!', '', 'success');
          this.editar = false;
        }
      });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  eliminarEvento(id: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Deseas eliminar el evento?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe((result) => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
        Swal.fire('¡Eliminado con éxito!', '', 'success');
      }
    });
  }

  private getUser() {
    this.user = this.userService.getUsuario();
  }

  ngOnInit(): void {
    this.getUser();

    this.eventService.getEvents(this.user.id_usuario).subscribe((data) => {
      this.events = data;
    });
  }
}
