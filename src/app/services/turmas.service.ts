import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Turma {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
  private apiUrl = 'http://localhost:3000/turmas';

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }
}
