export class Pestaña{
  name!: string;
  content = '';
  consola = '';

  constructor(name: string, content:string=""){
      this.name = name;
  }
}
