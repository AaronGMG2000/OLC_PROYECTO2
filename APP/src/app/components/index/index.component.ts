import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';
import {Pestaña} from 'src/app/models/pestaña';
import 'codemirror/mode/go/go';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/fold/xml-fold';
import { COMPILADORService } from 'src/app/services/compilador.service';
import { Contenido } from 'src/app/models/contenido';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  Pestanas: Array<Pestaña> = [];
  NumTab = 0;
  ContenidoTab = '';
  CONTENT = '';
  CONSOLA = '';
  buttons: Array<any> = [
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        hint: 'Agregar',
        stylingMode: 'contained',
        onClick: this.AnadirPestana.bind(this),
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'image',
        hint: 'AST',
        stylingMode: 'contained',
        // onClick: this.obtenerVariable.bind(this),
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'video',
        hint: 'Compilar',
        stylingMode: 'contained',
        onClick: this.Compilar.bind(this),
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'activefolder',
        hint: 'Abrir',
        stylingMode: 'contained',
        // onClick: ,
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'save',
        hint: 'Guardar',
        stylingMode: 'contained',
        // onClick: this.EliminarTodas.bind(this),
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        hint: 'Refrescar',
        stylingMode: 'contained',
        onClick: this.EliminarTodas.bind(this),
      },
    }
  ];
  constructor(
    private Interacion: IndexService,
    public compilador: COMPILADORService
  ) { }

  ngOnInit(): void {
    this.Pestanas = [];
    this.NumTab = 0;
    this.CONTENT = '';
    this.ContenidoTab = 'Pestaña 0';
  }

  AnadirPestana(): void{
    if (this.Pestanas.length === 0) {
      this.NumTab = 0;
    }
    this.Pestanas.push(new Pestaña('Pestaña ' + String(this.NumTab++)));
  }

  async removerPestana(): Promise<void>{
    if (!this.Pestanas.length) {
      await this.Interacion.Notificacion('No hay pestañas para remover');
      return;
    }
    const p = await this.Interacion.confirmacion('¿Eliminar Pestaña ' + this.ContenidoTab + '?');
    if (!p) {
      return;
    }
    this.Pestanas = this.Pestanas.filter((obj) => {
      return obj.name !== this.ContenidoTab;
    });
  }

  async EliminarTodas(): Promise<void>{
    const p = await this.Interacion.confirmacion('¿Desea eliminar todas las Pestañas?');
    if (p) {
      this.ngOnInit();
    }
  }

  showCloseButton(): boolean {
    return this.Pestanas.length >= 1;
  }

  seleccionarPestana(e: any): void {
    this.ContenidoTab = e.addedItems[0].name;
  }

  LlenarContent(text: string): void{
    this.CONTENT = text;
  }
  Compilar(): void{
    const text = this.CONTENT;
    const cont:Contenido = {
      Contenido: this.CONTENT
    };
    this.compilador.COMPILAR(cont).subscribe(
      (res: any) => {
        this.CONSOLA = "";
        this.CONSOLA = res.consola;
        console.log(res.consola);
      },
      (err: any) => console.log(err)
    );
  }
}
