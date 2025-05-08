import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Aluno {
  id: number;
  nome: string;
  turmaId: number;
}
@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private apiUrl = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAlunosPorTurma(turmaId: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}?turmaId=${turmaId}`);
  }

}
