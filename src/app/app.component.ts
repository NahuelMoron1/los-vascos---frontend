import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Los Vascos Distribucion-Centro De Venta';
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/status';
  }
  async ngOnInit() {
    window.addEventListener('scroll', () => {
      const scrollHeight: number = document.documentElement.scrollHeight;
      const scrollTop: number = document.documentElement.scrollTop;
      const clientHeight: number = document.documentElement.clientHeight;
      const scrollLeft: number = document.documentElement.scrollLeft;
      const scrollWidth: number = document.documentElement.scrollWidth;
      const clientWidth: number = document.documentElement.clientWidth;

      // Evitar desplazamiento hacia abajo
      if (scrollTop + clientHeight >= scrollHeight) {
        window.scrollTo(scrollLeft, scrollHeight - clientHeight);
      }

      // Evitar desplazamiento hacia arriba
      if (scrollTop <= 0) {
        window.scrollTo(scrollLeft, 0);
      }

      // Evitar desplazamiento hacia la derecha
      if (scrollLeft + clientWidth >= scrollWidth) {
        window.scrollTo(scrollWidth - clientWidth, scrollTop);
      }

      // Evitar desplazamiento hacia la izquierda
      if (scrollLeft <= 0) {
        window.scrollTo(0, scrollTop);
      }
    });
    this.http.get(this.myAppUrl + this.myApiUrl).subscribe((response: any) => {
      if (response == 'true') {
        if (this.isAdmin()) {
        } else {
          this.router.navigate(['/maintenance']);
        }
      }
    });
  }
  isAdmin() {
    if (localStorage.getItem('admin')) {
      return true;
    } else {
      return false;
    }
  }
}
