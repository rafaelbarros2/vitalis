import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definindo o tipo para a conduta final para garantir consistência.
type Conduta = 'alta' | 'observacao' | 'encaminhamento';

@Component({
  selector: 'app-root', // Usando app-root para ser o componente principal da visualização
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './atendimento-medico.component.html',
  styleUrl: './atendimento-medico.component.css'
})
export class AtendimentoMedicoComponent {
  // Signal para controlar a conduta selecionada
  condutaSelecionada = signal<Conduta | null>(null);
  
  // Lista de condutas para gerar os botões
  condutas = [
    { id: 'alta', nome: 'Alta Médica' },
    { id: 'observacao', nome: 'Permanecer em Observação' },
    { id: 'encaminhamento', nome: 'Encaminhamento' }
  ] as const;

  selecionarConduta(conduta: Conduta) {
    this.condutaSelecionada.set(this.condutaSelecionada() === conduta ? null : conduta);
  }
}
