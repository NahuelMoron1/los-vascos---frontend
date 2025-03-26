import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit{
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);
  component: string = "";

  ngOnInit(): void {
      let url = this.getCurrentRoute();
      this.component = this.getLastSegment(url);
  }

  getCurrentRoute(): string {
    return this.router.url; //Retorna la ruta actual de la pagina
  }
  getLastSegment(url: string): string {
    /* El origen de la funcion es verificar si la web está en el componente de login o si está en el componente de sign-up */
    const segments = url.split('/');
    return segments.pop() || ''; // Devuelve el último segmento o una cadena vacía si no hay segmentos
  }
}
