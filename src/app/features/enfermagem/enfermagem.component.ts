import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SinaisVitais, AnotacaoEnfermagem, PacienteEnfermagem } from '../../shared/models/enfermagem.model';

// Tipos para os dados de exemplo
interface Medicacao {
  nome: string;
  dosagem: string;
  administrada: boolean;
}

interface Paciente {
  id: number;
  nome: string;
  status: 'Em Observação' | 'Aguardando Medicação';
  leito: string;
  prescricao: {
    meds: Medicacao[];
    observacoes: string;
  };
}

type ModalType = 'none' | 'sinais-vitais' | 'anotacao' | 'historico';
type HistoricoTab = 'sinais-vitais' | 'anotacoes';

@Component({
  selector: 'app-enfermagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enfermagem.component.html',
  styleUrl: './enfermagem.component.css'
})
export class EnfermagemComponent {

  // State management
  modalAtivo = signal<ModalType>('none');
  pacienteSelecionado = signal<Paciente | null>(null);
  activeTab = signal<HistoricoTab>('sinais-vitais');

  // Formulários
  sinaisVitaisForm: FormGroup;
  anotacaoForm: FormGroup;

  // Históricos
  historicoSinaisVitais = signal<SinaisVitais[]>([]);
  historicoAnotacoes = signal<AnotacaoEnfermagem[]>([]);

  pacientes = signal<Paciente[]>([
    {
      id: 1,
      nome: 'Carlos Pereira',
      status: 'Aguardando Medicação',
      leito: '101-A',
      prescricao: {
        meds: [
          { nome: 'Dipirona 500mg', dosagem: '1 comp. 6/6h', administrada: false },
          { nome: 'Soro Fisiológico 0.9%', dosagem: '500ml EV', administrada: false },
        ],
        observacoes: 'Monitorar pressão arterial após soro.'
      }
    },
    {
      id: 2,
      nome: 'Juliana Martins',
      status: 'Em Observação',
      leito: 'OBS-02',
      prescricao: {
        meds: [
          { nome: 'Ondansetrona 4mg', dosagem: '1 comp. se náusea', administrada: true },
        ],
        observacoes: 'Reavaliar sintomas de tontura a cada 2 horas.'
      }
    },
    {
      id: 3,
      nome: 'Ricardo Almeida',
      status: 'Aguardando Medicação',
      leito: '102-B',
      prescricao: {
        meds: [
          { nome: 'Amoxicilina 500mg', dosagem: '1 comp. 8/8h', administrada: false },
          { nome: 'Ibuprofeno 400mg', dosagem: '1 comp. se dor', administrada: false },
        ],
        observacoes: ''
      }
    }
  ]);

  constructor(private fb: FormBuilder) {
    this.sinaisVitaisForm = this.createSinaisVitaisForm();
    this.anotacaoForm = this.createAnotacaoForm();
  }

  private createSinaisVitaisForm(): FormGroup {
    return this.fb.group({
      pressaoArterialSistolica: ['', [Validators.min(50), Validators.max(300)]],
      pressaoArterialDiastolica: ['', [Validators.min(30), Validators.max(200)]],
      frequenciaCardiaca: ['', [Validators.min(40), Validators.max(200)]],
      frequenciaRespiratoria: ['', [Validators.min(8), Validators.max(40)]],
      temperatura: ['', [Validators.min(30), Validators.max(45)]],
      saturacaoOxigenio: ['', [Validators.min(70), Validators.max(100)]],
      nivelDor: ['', [Validators.min(0), Validators.max(10)]],
      peso: [''],
      altura: [''],
      glicemia: [''],
      observacoes: ['']
    });
  }

  private createAnotacaoForm(): FormGroup {
    return this.fb.group({
      tipoAnotacao: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      sistema: [''],
      medicamento: [''],
      dose: [''],
      via: [''],
      local: [''],
      prescricaoMedica: [true],
      procedimento: [''],
      material: [''],
      resultado: [''],
      profissionalResponsavel: ['Enfermeiro(a) Responsável', Validators.required],
      coren: ['', [Validators.required, Validators.pattern(/^\d{6,7}$/)]],
      categoria: ['enfermeiro', Validators.required]
    });
  }

  // Função para marcar/desmarcar a administração de um medicamento.
  toggleMedicacao(pacienteId: number, medIndex: number) {
    this.pacientes.update(pacientes =>
      pacientes.map(p => {
        if (p.id === pacienteId) {
          const updatedMeds = [...p.prescricao.meds];
          updatedMeds[medIndex] = {
            ...updatedMeds[medIndex],
            administrada: !updatedMeds[medIndex].administrada
          };
          return { ...p, prescricao: { ...p.prescricao, meds: updatedMeds } };
        }
        return p;
      })
    );
  }

  // Abrir modais
  abrirModalSinaisVitais(paciente: Paciente) {
    this.pacienteSelecionado.set(paciente);
    this.modalAtivo.set('sinais-vitais');
    this.sinaisVitaisForm.reset();
  }

  abrirModalAnotacao(paciente: Paciente) {
    this.pacienteSelecionado.set(paciente);
    this.modalAtivo.set('anotacao');
    this.anotacaoForm.reset();
    this.anotacaoForm.patchValue({
      profissionalResponsavel: 'Enfermeiro(a) Responsável',
      categoria: 'enfermeiro',
      prescricaoMedica: true
    });
  }

  abrirModalHistorico(paciente: Paciente) {
    this.pacienteSelecionado.set(paciente);
    this.modalAtivo.set('historico');
    this.activeTab.set('sinais-vitais');
  }

  setActiveTab(tab: HistoricoTab) {
    this.activeTab.set(tab);
  }

  fecharModal() {
    this.modalAtivo.set('none');
    this.pacienteSelecionado.set(null);
  }

  // Salvar sinais vitais
  salvarSinaisVitais() {
    if (this.sinaisVitaisForm.valid && this.pacienteSelecionado()) {
      const novoRegistro: SinaisVitais = {
        id: Date.now(),
        pacienteId: this.pacienteSelecionado()!.id,
        dataHora: new Date().toISOString(),
        ...this.sinaisVitaisForm.value,
        profissionalResponsavel: 'Enfermeiro(a) Responsável',
        coren: '123456'
      };

      this.historicoSinaisVitais.update(historico => [...historico, novoRegistro]);
      this.fecharModal();

      // Simular notificação de sucesso
      alert('Sinais vitais registrados com sucesso!');
    } else {
      this.markFormGroupTouched(this.sinaisVitaisForm);
    }
  }

  // Salvar anotação
  salvarAnotacao() {
    if (this.anotacaoForm.valid && this.pacienteSelecionado()) {
      const novaAnotacao: AnotacaoEnfermagem = {
        id: Date.now(),
        pacienteId: this.pacienteSelecionado()!.id,
        dataHora: new Date().toISOString(),
        ...this.anotacaoForm.value,
        status: 'ativo' as const
      };

      this.historicoAnotacoes.update(historico => [...historico, novaAnotacao]);
      this.fecharModal();

      // Simular notificação de sucesso
      alert('Anotação de enfermagem registrada com sucesso!');
    } else {
      this.markFormGroupTouched(this.anotacaoForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;
      if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }

  // Obter histórico de um paciente
  obterHistoricoSinaisVitais(pacienteId: number): SinaisVitais[] {
    return this.historicoSinaisVitais().filter(s => s.pacienteId === pacienteId);
  }

  obterHistoricoAnotacoes(pacienteId: number): AnotacaoEnfermagem[] {
    return this.historicoAnotacoes().filter(a => a.pacienteId === pacienteId);
  }

  // Métodos de formatação para o histórico
  formatarDataHora(dataHora: string): string {
    const data = new Date(dataHora);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  formatarTipoAnotacao(tipo: string): string {
    const tipos: { [key: string]: string } = {
      'cuidado': 'Cuidado de Enfermagem',
      'medicacao': 'Administração de Medicação',
      'procedimento': 'Procedimento Realizado',
      'observacao': 'Observação Clínica',
      'intercorrencia': 'Intercorrência',
      'orientacao': 'Orientação ao Paciente'
    };
    return tipos[tipo] || tipo;
  }

  formatarSistema(sistema: string): string {
    const sistemas: { [key: string]: string } = {
      'cardiovascular': 'Cardiovascular',
      'respiratorio': 'Respiratório',
      'neurologico': 'Neurológico',
      'gastrointestinal': 'Gastrointestinal',
      'geniturinario': 'Geniturinário',
      'tegumentar': 'Tegumentar',
      'musculoesqueletico': 'Musculoesquelético',
      'outros': 'Outros'
    };
    return sistemas[sistema] || sistema;
  }

  formatarVia(via: string): string {
    const vias: { [key: string]: string } = {
      'oral': 'Oral (VO)',
      'iv': 'Intravenosa (IV)',
      'im': 'Intramuscular (IM)',
      'sc': 'Subcutânea (SC)',
      'inalatoria': 'Inalatória',
      'topica': 'Tópica',
      'outras': 'Outras'
    };
    return vias[via] || via;
  }

  formatarCategoria(categoria: string): string {
    const categorias: { [key: string]: string } = {
      'enfermeiro': 'Enfermeiro(a)',
      'tecnico_enfermagem': 'Técnico(a) de Enfermagem',
      'auxiliar_enfermagem': 'Auxiliar de Enfermagem'
    };
    return categorias[categoria] || categoria;
  }

  formatarStatus(status: string): string {
    const statuses: { [key: string]: string } = {
      'ativo': 'Ativo',
      'editado': 'Editado',
      'cancelado': 'Cancelado'
    };
    return statuses[status] || status;
  }
}

