import { PessoaUsuaria } from './../types/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cadastrar(PessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.http.post<PessoaUsuaria>(
      `${this.apiUrl}/auth/cadastro`,
      PessoaUsuaria
    );
  }

  buscarCadastro(): Observable<PessoaUsuaria> {
    return this.http.get<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`); // retorna os dados do usuario
  }
  editarCadastro(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.http.patch<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
      pessoaUsuaria
    ); // atuatliza os dados do usuario
  }
}
