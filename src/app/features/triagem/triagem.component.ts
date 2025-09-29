import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definindo os tipos para a classificação de risco para garantir consistência.
type RiscoClassificacao = 'emergencia' | 'muito_urgente' | 'urgente' | 'pouco_urgente' | 'nao_urgente';
@Component({
  selector: 'app-triagem',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './triagem.component.html',
  styleUrl: './triagem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TriagemComponent {
  // Signal para controlar qual botão de risco está selecionado
  riscoSelecionado = signal<RiscoClassificacao | null>(null);

  // Lista de classificações para gerar os botões dinamicamente
  classificacoes = [
    { id: 'emergencia', nome: 'Emergência', cor: 'bg-red-500 hover:bg-red-600' },
    { id: 'muito_urgente', nome: 'Muito Urgente', cor: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'urgente', nome: 'Urgente', cor: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 'pouco_urgente', nome: 'Pouco Urgente', cor: 'bg-green-600 hover:bg-green-700' },
    { id: 'nao_urgente', nome: 'Não Urgente', cor: 'bg-blue-500 hover:bg-blue-600' }
  ] as const;

  selecionarRisco(risco: RiscoClassificacao) {
    // Se o risco clicado já estiver selecionado, desmarque. Caso contrário, selecione.
    this.riscoSelecionado.set(this.riscoSelecionado() === risco ? null : risco);
  }
}