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
  actual:any = undefined;
  CONTENT = '';
  CONSOLA = '';
  errores: any;
  simbolos:any;
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
        icon: 'save',
        hint: 'Guardar',
        stylingMode: 'contained',
        onClick: this.saveAsProject.bind(this),
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
    this.actual = undefined;
    this.ContenidoTab = 'Pestaña 0';
  }

  AnadirPestana(): void{
    if (this.Pestanas.length === 0) {
      this.NumTab = 0;
    }
    this.Pestanas.push(new Pestaña('Pestaña ' + String(this.NumTab++)));
  }

  async upload(e: any) {
    console.log(e);
    let files = e.srcElement.files;
    let input = e.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = async () => {
      let nueva = new Pestaña("TAB_"+(this.NumTab++)+" "+files[0].name);
      this.Pestanas.push(nueva);
      this.ContenidoTab = nueva.name;
      nueva.content =<string>reader.result;
      nueva.consola = "";
    };
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
    this.errores = [];
    this.simbolos = [];
    this.Pestanas = this.Pestanas.filter((obj) => {
      return obj.name !== this.ContenidoTab;
    });
  }

  async EliminarTodas(): Promise<void>{
    const p = await this.Interacion.confirmacion('¿Desea eliminar todas las Pestañas?');
    if (p) {
      this.errores = [];
      this.simbolos = [];
      this.ngOnInit();
    }
  }

  showCloseButton(): boolean {
    return this.Pestanas.length >= 1;
  }

  saveAsProject() {
    //you can enter your own file name and extension
    if (this.NumTab!=0) {
      this.writeContents(this.CONTENT, this.ContenidoTab + ".ty", "text/plain");
    }
  }
  writeContents(content:string, fileName:string, contentType:string) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  seleccionarPestana(e: any): void {
    this.ContenidoTab = e.addedItems[0].name;
    this.CONSOLA = e.addedItems[0].consola;
    this.CONTENT = e.addedItems[0].content;
    this.actual = e.addedItems[0];
  }

  LlenarContent(text: string): void{
    this.CONTENT = text;
  }
  Compilar(): void{
    const cont:Contenido = {
      Contenido: this.CONTENT
    };
    this.compilador.COMPILAR(cont).subscribe(
      (res: any) => {
        this.CONSOLA = "";
        this.CONSOLA = res.consola;
        this.actual.consola = this.CONSOLA;
        this.errores = res.Errores;
        this.simbolos = res.Simbolo;
      },
      (err: any) => console.log(err)
    );
  }
}
