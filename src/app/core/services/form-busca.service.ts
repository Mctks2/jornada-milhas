import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { DadosBusca } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  formBusca: FormGroup;

  constructor(private dialog: MatDialog) {

    const somenteIda = new FormControl(false, [Validators.required])
    const dataVolta = new FormControl(null, [Validators.required])

    this.formBusca = new FormGroup({
      somenteIda,
      origem: new FormControl(null, [Validators.required]),
      destino: new FormControl(null, [Validators.required]),
      tipo: new FormControl('Executiva'),
      adultos: new FormControl(0),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
      dataIda: new FormControl(null, [Validators.required]),
      dataVolta
    })
    somenteIda.valueChanges.subscribe(somenteIda =>{
      if (somenteIda){
        dataVolta.disable();
        dataVolta.setValidators(null);
      } else  {
        dataVolta.enable();
        dataVolta.setValidators([Validators.required]);
      }
      dataVolta.updateValueAndValidity();
    })
  }

  getDescricaoPassageiros(): string {
    let descricao = '';

    const adultos = this.formBusca.get('adultos')?.value;
    if (adultos && adultos > 0) { // Verifica se o valor é válido e não é nulo
      descricao += `${adultos} adulto${adultos > 1 ? 's' : ''}`; // Adiciona a descrição dos adultos
    }

    const criancas = this.formBusca.get('criancas')?.value;
    if (criancas && criancas > 0) {
      descricao += `${descricao ? ', ' : ''}${criancas} criança${
        criancas > 1 ? 's' : ''
      }`;
    }

    const bebes = this.formBusca.get('bebes')?.value;
    if (bebes && bebes > 0) {
      descricao += `${descricao ? ', ' : ''}${bebes} bebê${
        bebes > 1 ? 's' : ''
      }`;
    }
    return descricao;
  }
  obterControle<T>(nome: string): FormControl {
    //  Verifica se o controle existe no formulário e, se não existir, lança um erro.
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  obterDadosBusca(): DadosBusca {

    const dataIdaControl = this.obterControle<Date>('dataIda').value;

    //  Cria um objeto DadosBusca com os valores do formulário.
    const dadosBusca: DadosBusca = {
      pagina: 1,
      porPagina: 50,
      somenteIda: this.obterControle<boolean>('somenteIda').value,
      origemId: this.obterControle<number>('origem').value.id,
      destinoId: this.obterControle<boolean>('destino').value.id,
      tipo: this.obterControle<string>('tipo').value,
      passageirosAdultos: this.obterControle<number>('adultos').value,
      passageirosCriancas: this.obterControle<number>('criancas').value,
      passageirosBebes: this.obterControle<number>('bebes').value,
      dataIda: dataIdaControl.value.toISOString()
    }

    const dataVoltaControl = this.obterControle<Date>('dataVolta').value;
    if (dataVoltaControl.value) {
      dadosBusca.dataVolta = dataVoltaControl.value.toISOString();
    }

    return dadosBusca;
  }



  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    // Verifica se o chip foi selecionado e, se sim, atualiza o formulário com o tipo selecionado.
    if (evento.selected) {
      this.formBusca.patchValue({
        tipo,
      });
      console.log('Tipo de passagem alterado para:', tipo);
    }
  }

  openDialog() {
    // Abre o modal de busca
    this.dialog.open(ModalComponent, {
      width: '50%',
    });
  }


    trocarOrigemDestino(): void {
      const origem = this.formBusca.get('origem')?.value;
      const destino = this.formBusca.get('destino')?.value;

      this.formBusca.patchValue({
        origem: destino,
        destino: origem
      });
    }

    get formEstaValido() {
      return this.formBusca.valid;
    }

}
