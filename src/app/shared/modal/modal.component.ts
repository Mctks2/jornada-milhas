import { MatDialogRef } from '@angular/material/dialog';
import { FormBuscaService } from './../../core/services/form-busca.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(
    public FormBuscaService: FormBuscaService,
    private dialogRef: MatDialogRef<ModalComponent>) { }

  salvarOpcoes(): void {
    // Aqui você pode salvar as opções do formulário
    const dadosFormulario = this.FormBuscaService.formBusca.value;
    //console.log('Dados salvos:', dadosFormulario);

    // Fechar o modal após salvar
    this.dialogRef.close(dadosFormulario);
  }
}
