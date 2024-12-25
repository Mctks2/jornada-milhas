import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {

constructor(public dialog: MatDialog) {} // injetar o serviço MatDialog no construtor do componente
  openDialog() {
    this.dialog.open(ModalComponent)
  }
}
