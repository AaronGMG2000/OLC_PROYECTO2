import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  custom as customDialogComponent,
  alert as alertComponent,
} from 'devextreme/ui/dialog';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  @Output() appLoadingChange: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  constructor() { }

  async Notificacion(errorMessage: any, title?: string): Promise<any> {
    try {
      let customDialog = customDialogComponent({
        title: title ? title : '¡Alerta!',
        messageHtml: `<i>${errorMessage}</i>`,
        buttons: [
          {
            text: 'Aceptar',
            onClick: () => {
              errorMessage = null;
              customDialog = null;
            },
          },
        ],
      });


      return await customDialog.show();
    } catch (error) {
      return Promise.resolve();
    }
  }

  alerta(message: string, title: string): Promise<void> {

    return alertComponent(`<i>${message}</i>`, title);
  }

  async confirmacion(message: string, title?: string): Promise<boolean> {
    try {
      const customDialog = customDialogComponent({
        title: title ? title : '¡Cuidado!',
        messageHtml: `<i>${message}</i>`,
        buttons: [
          {
            text: 'Confirmar',
            onClick: () => {
              return Promise.resolve(true);
            },
          },
          {
            text: 'Cancelar',
            onClick: () => {
              return Promise.resolve(false);
            },
          },
        ],
      });

      const result = await customDialog.show();

      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  async MostrarError(mensaje: string, title?: string): Promise<void> {
    let customDialog = customDialogComponent({
      title: title ? title : '¡Alerta!',
      messageHtml: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          onClick: () => {
            customDialog = null;
          },
        },
      ],
    });

    await customDialog.show();
  }
}
