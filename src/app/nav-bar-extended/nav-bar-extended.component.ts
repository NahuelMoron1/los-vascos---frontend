import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar-extended',
  templateUrl: './nav-bar-extended.component.html',
  styleUrl: './nav-bar-extended.component.css',
})
export class NavBarExtendedComponent {
  isAtTop: boolean = true; // Solo visible en la parte superior

  isHidden = false;
  isMobile = false;

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  toggleVisibility() {
    this.isHidden = !this.isHidden;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Muestra el botón solo si el ancho es menor a 768px
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isAtTop = window.pageYOffset === 0; // Solo muestra el swiper si está arriba del todo
  }
}
