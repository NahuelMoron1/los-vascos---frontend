import { inject, Injectable } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';

@Injectable({
  providedIn: 'root',
})
export class WaitService {
  private skyWaitSvc = inject(SkyWaitService);
  constructor() {}

  displayWait(loading: boolean) {
    if (loading) {
      this.skyWaitSvc.beginBlockingPageWait();
    } else {
      this.skyWaitSvc.endBlockingPageWait();
      this.skyWaitSvc.clearAllPageWaits();
    }

    // Esperar un breve tiempo para asegurarse de que el mensaje se haya insertado en el DOM
    setTimeout(() => {
      const message = document.querySelector('.sky-live-announcer-element');
      if (message) {
        message.remove();
      }
    });
  }
}
