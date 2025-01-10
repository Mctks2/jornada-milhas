import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = 'environment.apiUrl'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  autenticar(email: string, senha: string): Observable<any> { //autenticar() é um método que recebe email e senha e retorna um Observable
    return this.http.post(`${this.apiUrl}/auth/login`, { email, senha }); // faz uma requisição POST para a API

  }
}
