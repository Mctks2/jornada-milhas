import { FormBuscaService } from './../../core/services/form-busca.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss'],
})
export class FormBuscaComponent {
  constructor(public formBuscaService: FormBuscaService) {}
}
