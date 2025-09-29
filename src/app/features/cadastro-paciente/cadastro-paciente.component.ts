import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PacienteCadastro } from '../../shared/models/paciente.model';
import { MaskUtils } from '../../shared/utils/mask.utils';

// Tipo para controlar o estado da tela: buscando ou cadastrando.
type ViewState = 'busca' | 'cadastro';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.css'
})
export class CadastroPacienteComponent {
  viewState = signal<ViewState>('busca');
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Dados Pessoais Básicos
      nome: ['', [Validators.required, Validators.minLength(2)]],
      nomeSocial: [''],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      identidadeGenero: [''],
      orientacaoSexual: [''],
      estadoCivil: ['', Validators.required],
      naturalidade: [''],
      nacionalidade: ['Brasil', Validators.required],

      // Documentos de Identificação
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: [''],
      orgaoExpedidorRg: [''],
      ufExpedicaoRg: [''],
      dataExpedicaoRg: [''],
      cns: [''],
      numeroPis: [''],
      tituloEleitor: [''],
      zonaEleitoral: [''],
      secaoEleitoral: [''],
      passaporte: [''],
      validadePassaporte: [''],
      carteiraTrabalho: [''],
      serieCarteiraTrabalho: [''],

      // Dados Familiares e Responsáveis
      nomeMae: [''],
      cpfMae: [''],
      nomePai: [''],
      cpfPai: [''],
      nomeResponsavel: [''],
      cpfResponsavel: [''],
      parentescoResponsavel: [''],
      telefoneResponsavel: [''],

      // Contato e Comunicação
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      telefoneRecado: [''],
      telefoneEmergencia: [''],
      email: ['', [Validators.email]],
      emailSecundario: ['', [Validators.email]],
      possuiWhatsapp: [false],
      numeroWhatsapp: [''],
      prefereContato: ['telefone', Validators.required],

      // Endereço Residencial
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['Brasil', Validators.required],
      pontoReferencia: [''],
      tipoResidencia: ['', Validators.required],
      tempoResidencia: [''],

      // Dados Socioeconômicos
      profissao: [''],
      ocupacao: [''],
      situacaoTrabalhista: ['', Validators.required],
      rendaFamiliar: [''],
      escolaridade: ['', Validators.required],
      raca: ['', Validators.required],

      // Informações Médicas Detalhadas
      tipoSanguineo: [''],
      fatorRh: [''],
      peso: [''],
      altura: [''],
      doador: ['nao_informado', Validators.required],

      // Histórico Médico
      alergias: [''],
      alergiasMedicamentos: [''],
      medicamentosUso: [''],
      condicoesMedicas: [''],
      cirurgiasAnteriores: [''],
      hospitalizacoesAnteriores: [''],
      historicoFamiliar: [''],
      deficiencias: [''],
      limitacoesFisicas: [''],

      // Hábitos e Estilo de Vida
      tabagismo: ['nao_fumante', Validators.required],
      quantidadeCigarrosDia: [''],
      tempoTabagismo: [''],
      etilismo: ['nao_bebe', Validators.required],
      frequenciaAlcool: [''],
      usoSubstancias: [''],
      atividadeFisica: ['sedentario', Validators.required],
      frequenciaExercicio: [''],

      // Contatos de Emergência
      contatoEmergencia1_nome: [''],
      contatoEmergencia1_parentesco: [''],
      contatoEmergencia1_telefone: [''],
      contatoEmergencia1_endereco: [''],

      contatoEmergencia2_nome: [''],
      contatoEmergencia2_parentesco: [''],
      contatoEmergencia2_telefone: [''],
      contatoEmergencia2_endereco: [''],

      // Informações do SUS/Convênio Detalhadas
      tipoAtendimento: ['sus', Validators.required],
      numeroCartaoSus: [''],
      validadeCartaoSus: [''],
      convenio: [''],
      numeroCarteirinha: [''],
      validadeConvenio: [''],
      planoBeneficiario: [''],
      carenciaConvenio: [''],
      coparticipacao: [false],

      // Dados Administrativos
      motivoConsulta: [''],
      encaminhamento: [''],
      medicalReferencia: [''],
      prioridade: ['normal'],
      observacoes: [''],
      autorizaContato: [true, Validators.required],
      autorizaDivulgacaoImagem: [false, Validators.required],

      // Campos de Controle
      ativo: [true]
    });
  }

  setViewState(state: ViewState) {
    this.viewState.set(state);
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const paciente: PacienteCadastro = this.cadastroForm.value;
      console.log('Paciente cadastrado:', paciente);
      // Aqui você implementaria a lógica para salvar o paciente
      this.setViewState('busca');
      this.cadastroForm.reset();
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.cadastroForm.controls).forEach(key => {
      const control = this.cadastroForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.cadastroForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.cadastroForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) {
        switch (fieldName) {
          case 'cpf': return 'CPF deve estar no formato 000.000.000-00';
          case 'telefone': return 'Telefone deve estar no formato (00) 00000-0000';
          case 'cep': return 'CEP deve estar no formato 00000-000';
          default: return 'Formato inválido';
        }
      }
      if (field.errors['email']) return 'Email inválido';
    }
    return '';
  }

  // Métodos para aplicar máscaras
  onCpfInput(event: any): void {
    const value = event.target.value;
    const maskedValue = MaskUtils.cpfMask(value);
    this.cadastroForm.patchValue({ cpf: maskedValue });
  }

  onPhoneInput(event: any, fieldName: string): void {
    const value = event.target.value;
    const maskedValue = MaskUtils.phoneMask(value);
    this.cadastroForm.patchValue({ [fieldName]: maskedValue });
  }

  onCepInput(event: any): void {
    const value = event.target.value;
    const maskedValue = MaskUtils.cepMask(value);
    this.cadastroForm.patchValue({ cep: maskedValue });
  }
}