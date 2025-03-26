import { Component, inject, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  cookieService = inject(CookieService);
  user: PublicUser = new PublicUser('', '', '', false);
  async ngOnInit() {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
  }
  downloadLink(brand: string) {
    const link = document.createElement('a');
    link.download = `Lista_Precios_${brand.toUpperCase()}.pdf`; // Especifica el nombre que deseas
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
