import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../shared/models/paciente.model';

@Component({
  selector: 'app-painel-atendimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-atendimento.component.html',
  styleUrl: './painel-atendimento.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PainelAtendimentoComponent {
  // Dados de Exemplo (Mock)
  private pacientesData: Paciente[] = [
    { id: 1, nome: 'Ana Carolina Souza', horaChegada: '08:15', status: 'Aguardando Triagem', queixaPrincipal: 'Dor de cabeça e febre.' },
    { id: 2, nome: 'Bruno Alves', horaChegada: '08:22', status: 'Aguardando Atendimento', classificacao: 'urgente', queixaPrincipal: 'Corte profundo no dedo.' },
    { id: 3, nome: 'Carlos Eduardo Lima', horaChegada: '08:30', status: 'Em Atendimento', classificacao: 'muito_urgente', queixaPrincipal: 'Dificuldade para respirar.' },
    { id: 4, nome: 'Daniela Ferreira', horaChegada: '08:40', status: 'Aguardando Atendimento', classificacao: 'pouco_urgente', queixaPrincipal: 'Tosse seca há 3 dias.' },
    { id: 5, nome: 'Eduardo Martins', horaChegada: '08:55', status: 'Aguardando Triagem', queixaPrincipal: 'Dor de garganta.' },
    { id: 6, nome: 'Fernanda Costa', horaChegada: '09:05', status: 'Aguardando Atendimento', classificacao: 'nao_urgente', queixaPrincipal: 'Renovação de receita.' },
    { id: 7, nome: 'Gustavo Pereira', horaChegada: '07:50', status: 'Aguardando Atendimento', classificacao: 'emergencia', queixaPrincipal: 'Dor no peito intensa.' },
  ];

  // State Management com Signals
  pacientes = signal<Paciente[]>(this.pacientesData);

  // Computed Signals para filtrar as listas de cada coluna
  aguardandoTriagem = computed(() =>
    this.pacientes().filter(p => p.status === 'Aguardando Triagem')
  );

  emAtendimento = computed(() =>
    this.pacientes().filter(p => p.status === 'Em Atendimento')
  );

  // A fila de atendimento médico é ordenada pela classificação de risco
  aguardandoAtendimento = computed(() =>
    this.pacientes()
      .filter(p => p.status === 'Aguardando Atendimento')
      .sort((a, b) => this.getOrdemClassificacao(a.classificacao) - this.getOrdemClassificacao(b.classificacao))
  );

  // Funções Auxiliares para Classificação

  // Mapeia a classificação para uma ordem numérica para ordenação
  private getOrdemClassificacao(classificacao?: string): number {
    switch (classificacao) {
      case 'emergencia': return 1;
      case 'muito_urgente': return 2;
      case 'urgente': return 3;
      case 'pouco_urgente': return 4;
      case 'nao_urgente': return 5;
      default: return 99;
    }
  }

  // Retorna as classes de cor do TailwindCSS para cada tipo de classificação
  getCorClassificacao(classificacao?: string): { border: string, badge: string } {
    switch (classificacao) {
      case 'emergencia': return { border: 'border-red-500', badge: 'bg-red-100 text-red-800' };
      case 'muito_urgente': return { border: 'border-orange-500', badge: 'bg-orange-100 text-orange-800' };
      case 'urgente': return { border: 'border-yellow-500', badge: 'bg-yellow-100 text-yellow-800' };
      case 'pouco_urgente': return { border: 'border-green-500', badge: 'bg-green-100 text-green-800' };
      case 'nao_urgente': return { border: 'border-blue-500', badge: 'bg-blue-100 text-blue-800' };
      default: return { border: 'border-slate-300', badge: 'bg-slate-200 text-slate-600' };
    }
  }

  // Retorna o nome formatado para exibição na tela
  getNomeClassificacao(classificacao?: string): string {
     switch (classificacao) {
      case 'emergencia': return 'Emergência';
      case 'muito_urgente': return 'Muito Urgente';
      case 'urgente': return 'Urgente';
      case 'pouco_urgente': return 'Pouco Urgente';
      case 'nao_urgente': return 'Não Urgente';
      default: return 'Não Classificado';
    }
  }
}