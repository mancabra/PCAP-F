import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
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
  };

  events = [];

  user!: any;

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

  guardarEvento() {
    this.eventService
      .saveEvent(this.event, this.user.id_usuario)
      .subscribe((data) => {});
    window.location.reload();
  }

  private getUser() {
    this.user = this.userService.getUsuario();
  }

  ngOnInit(): void {
    this.getUser();

    this.eventService.getEvents(this.user.id_usuario).subscribe((data) => {
      this.events = data;
      console.log(this.events);
    });
  }
}
