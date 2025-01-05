import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  formBusca: FormGroup;

  constructor(private dialog: MatDialog) {
    this.formBusca = new FormGroup({
      somenteIda: new FormControl(false),
      origem: new FormControl(null),
      destino: new FormControl(null),
      tipo: new FormControl('Executiva'),
      adultos: new FormControl(3),
      criancas: new FormControl(0),
      bebes: new FormControl(1),
    });
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
  obterControle(nome: string): FormControl {
    //  Verifica se o controle existe no formulário e, se não existir, lança um erro.
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
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
}
