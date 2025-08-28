import { Component, OnInit, inject } from '@angular/core';
import { adminGuard } from 'src/app/guards/admin.guard';
import { PublicUser } from 'src/app/models/PublicUser';
import { CookieService } from 'src/app/services/cookie.service';
import { ExportTablesService } from 'src/app/services/export-tables.service';
import { UserDisplayService } from 'src/app/services/user-display.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-options-user',
  templateUrl: './options-user.component.html',
  styleUrls: ['./options-user.component.css'],
})
export class OptionsUserComponent implements OnInit {
  displayService = inject(UserDisplayService);
  cookieService = inject(CookieService);
  exportService = inject(ExportTablesService);
  displayed = this.displayService.displayed;
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);
  displaySubmenu: boolean = false;
  displayCoupon: boolean = false;
  displayExport: boolean = false;

  async ngOnInit() {
    this.cookieService.returnUser().subscribe((data) => {
      this.user = data;
    });
    this.cookieService.returnAdmin().subscribe((data) => {
      this.admin = data;
    });
  }

  toggleSubmenu(type: string) {
    if (type == 'user') {
      if (this.displaySubmenu) {
        this.displaySubmenu = false;
      } else {
        this.displaySubmenu = true;
      }
    } else if (type == 'coupon') {
      if (this.displayCoupon) {
        this.displayCoupon = false;
      } else {
        this.displayCoupon = true;
      }
    } else if (type == 'export') {
      if (this.displayExport) {
        this.displayExport = false;
      } else {
        this.displayExport = true;
      }
    }
  }
  changeDisplay(name: string) {
    this.displayService.changeDisplay(name);
    window.scrollTo(0, 0);
  }

  async export(type: string) {
    if (this.isAdmin()) {
      const urlToDownload = await this.exportService
        .exportTablesFunction(type)
        .toPromise();

      const fullUrl = environment.endpoint + urlToDownload;

      if (urlToDownload) {
        const link = document.createElement('a');
        link.href = fullUrl;
        link.download = urlToDownload;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  isAdmin() {
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
}
