import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OpcoesDeParada } from 'src/app/core/types/types';

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html',
  styleUrls: ['./paradas.component.scss']
})
export class ParadasComponent implements OnInit {

  opcoesSelecionada: OpcoesDeParada | null = null;

  opcoes: OpcoesDeParada[] = [
    {
      display: "Direto",
      value: "0"
    },
    {
      display: "1 conexão",
      value: "1"
    },
    {
      display: "2 conexões",
      value: "2"
    },
    {
      display: "Mais de 2 conexões",
      value: "3"
    },
  ]
  conexoesControl: FormControl<number | null>

  constructor(private formBuscaService: FormBuscaService) {
    this.conexoesControl = this.formBuscaService.obterControle<number>('conexoes'); // Inicializa o controle de conexões
  }

  ngOnInit() {
    this.conexoesControl.valueChanges.subscribe(
      (value) => {
      if (!value) { // Verifica se o valor é nulo ou indefinido
        this.opcoesSelecionada = null;
      }
    });
  }


  alternarParada(opcao: OpcoesDeParada, checked: boolean){
    if(!checked){
      this.opcoesSelecionada = null;
      this.formBuscaService.formBusca.patchValue({
        conexoes: null
      })
      return
    }
    this.opcoesSelecionada = opcao
    this.formBuscaService.formBusca.patchValue({
      conexoes: Number(opcao.value)
    })
  }

  paradaSelecionada(opcao: OpcoesDeParada): boolean {
    return this.opcoesSelecionada === opcao
  }

  incluirParada(opcao: OpcoesDeParada) {
    if(!this.opcoesSelecionada){
      return false
    } else {
      return this.opcoesSelecionada.value > opcao.value
    }
  }
}
