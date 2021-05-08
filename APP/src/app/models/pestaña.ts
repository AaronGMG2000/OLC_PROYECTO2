export class Pestaña{
  name!: string;
  content = '';
  consola = '';
  simbolo = [];
  errores = [];
  constructor(name: string, content:string=""){
      this.name = name;
  }
}
