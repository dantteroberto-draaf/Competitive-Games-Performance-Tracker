import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para garantir que os dados batem com o Python
export interface Partida {
  id?: number;
  jogo: string;
  resultado: string;
  abates: number;
  mortes: number;
  assistencias: number;
  data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/partidas';

  constructor(private http: HttpClient) { }

  // Buscar todas
  listarPartidas(): Observable<Partida[]> {
    return this.http.get<Partida[]>(this.apiUrl);
  }

  // Salvar uma
  salvarPartida(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(this.apiUrl, partida);
  }
  
  // Deletar uma
  deletarPartida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}