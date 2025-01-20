import { UserService } from './../../core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/types';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Form, FormGroup } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo = 'Olá ';
  textoBotao = 'ATUALIZAR';
  perfilComponent = true;

  token = '';
  nome = '';
  cadastro!: PessoaUsuaria;
  form!: FormGroup<any> | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private router: Router,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = cadastro.nome;
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formularioService.getCadastro(); // obtém o formulário do serviço
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado,
      genero: this.cadastro.genero
    }); // atualiza os valores do formulário com os dados do cadastro
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado,
      genero: this.form?.value.genero
    }
    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: () => {
        alert('Cadastro editado com sucesso!')
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Erro ao editar o cadastro', error);
      }
    })
  }
}
