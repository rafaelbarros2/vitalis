import { Routes } from '@angular/router';
import { PainelAtendimentoComponent } from './features/painel-atendimento/painel-atendimento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/painel', pathMatch: 'full' },
  { path: 'painel', component: PainelAtendimentoComponent },
  { path: 'cadastro-paciente', loadComponent: () => import('./features/cadastro-paciente/cadastro-paciente.component').then(m => m.CadastroPacienteComponent) },
  { path: 'triagem', loadComponent: () => import('./features/triagem/triagem.component').then(m => m.TriagemComponent) },
  { path: 'atendimento-medico', loadComponent: () => import('./features/atendimento-medico/atendimento-medico.component').then(m => m.AtendimentoMedicoComponent) },
  { path: 'enfermagem', loadComponent: () => import('./features/enfermagem/enfermagem.component').then(m => m.EnfermagemComponent) },
  { path: '**', redirectTo: '/painel' }
];
