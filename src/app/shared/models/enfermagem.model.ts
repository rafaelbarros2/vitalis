export interface SinaisVitais {
  id: number;
  pacienteId: number;
  dataHora: string;

  // Sinais Vitais
  pressaoArterialSistolica?: number;  // mmHg
  pressaoArterialDiastolica?: number; // mmHg
  frequenciaCardiaca?: number;        // bpm
  frequenciaRespiratoria?: number;    // rpm
  temperatura?: number;               // °C
  saturacaoOxigenio?: number;         // %
  nivelDor?: number;                  // 0-10

  // Dados Adicionais
  peso?: number;                      // kg
  altura?: number;                    // cm
  glicemia?: number;                  // mg/dL

  // Controle
  profissionalResponsavel: string;
  coren: string;
  observacoes?: string;
}

export interface AnotacaoEnfermagem {
  id: number;
  pacienteId: number;
  dataHora: string;

  // Conteúdo da Anotação
  tipoAnotacao: 'cuidado' | 'medicacao' | 'procedimento' | 'observacao' | 'intercorrencia' | 'orientacao';
  descricao: string;

  // Classificação por Sistema
  sistema?: 'cardiovascular' | 'respiratorio' | 'neurológico' | 'gastrointestinal' | 'geniturinario' | 'tegumentar' | 'musculoesqueletico' | 'outros';

  // Para Medicações
  medicamento?: string;
  dose?: string;
  via?: 'oral' | 'iv' | 'im' | 'sc' | 'inalatoria' | 'topica' | 'outras';
  local?: string;
  prescricaoMedica?: boolean;

  // Para Procedimentos
  procedimento?: string;
  material?: string;
  resultado?: string;

  // Controle e Responsabilidade
  profissionalResponsavel: string;
  coren: string;
  categoria: 'enfermeiro' | 'tecnico_enfermagem' | 'auxiliar_enfermagem';

  // Status
  status: 'ativo' | 'editado' | 'cancelado';
  motivoEdicao?: string;
  dataEdicao?: string;
}

export interface HistoricoEnfermagem {
  pacienteId: number;
  sinaisVitais: SinaisVitais[];
  anotacoes: AnotacaoEnfermagem[];
}

export interface PacienteEnfermagem {
  id: number;
  nome: string;
  quarto: string;
  leito: string;
  idade: number;
  sexo: string;
  classificacao: 'emergencia' | 'muito_urgente' | 'urgente' | 'pouco_urgente' | 'nao_urgente';
  status: 'Internado' | 'Em Observação' | 'Aguardando Alta' | 'Em Cirurgia';
  dataInternacao: string;
  diagnosticoPrincipal?: string;
  alergias?: string;
  ultimosSinaisVitais?: SinaisVitais;
  prescricoesPendentes?: number;
  alertas?: string[];
}