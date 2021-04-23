import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Contenido } from '../models/contenido';

@Injectable({
  providedIn: 'root'
})
export class COMPILADORService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  COMPILAR(Contenido: Contenido): any{
    return this.http.post<any>(`${this.API_URI}/Compilar/?Contenido=${Contenido}`, Contenido);
  }
}
