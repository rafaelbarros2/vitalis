export interface Paciente {
  id: number;
  nome: string;
  horaChegada: string;
  status: 'Aguardando Triagem' | 'Aguardando Atendimento' | 'Em Atendimento';
  classificacao?: 'emergencia' | 'muito_urgente' | 'urgente' | 'pouco_urgente' | 'nao_urgente';
  queixaPrincipal: string;
}

export interface PacienteCadastro {
  // Dados Pessoais Básicos
  nome: string;
  nomeSocial?: string;
  dataNascimento: string;
  sexo: 'masculino' | 'feminino' | 'intersexo' | 'nao_informado';
  identidadeGenero?: 'homem_cis' | 'mulher_cis' | 'homem_trans' | 'mulher_trans' | 'nao_binario' | 'outros' | 'nao_informado';
  orientacaoSexual?: 'heterossexual' | 'homossexual' | 'bissexual' | 'pansexual' | 'assexual' | 'outros' | 'nao_informado';
  estadoCivil: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel' | 'separado';
  naturalidade?: string;
  nacionalidade: string;

  // Documentos de Identificação
  cpf: string;
  rg?: string;
  orgaoExpedidorRg?: string;
  ufExpedicaoRg?: string;
  dataExpedicaoRg?: string;
  cns?: string; // Cartão Nacional de Saúde
  numeroPis?: string;
  tituloEleitor?: string;
  zonaEleitoral?: string;
  secaoEleitoral?: string;
  passaporte?: string;
  validadePassaporte?: string;
  carteiraTrabalho?: string;
  serieCarteiraTrabalho?: string;

  // Dados Familiares e Responsáveis
  nomeMae?: string;
  cpfMae?: string;
  nomePai?: string;
  cpfPai?: string;
  nomeResponsavel?: string;
  cpfResponsavel?: string;
  parentescoResponsavel?: string;
  telefoneResponsavel?: string;

  // Contato e Comunicação
  telefone: string;
  telefoneRecado?: string;
  telefoneEmergencia?: string;
  email?: string;
  emailSecundario?: string;
  possuiWhatsapp: boolean;
  numeroWhatsapp?: string;
  prefereContato: 'telefone' | 'email' | 'whatsapp' | 'sms';

  // Endereço Residencial
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  pontoReferencia?: string;
  tipoResidencia: 'propria' | 'alugada' | 'financiada' | 'cedida' | 'outros';
  tempoResidencia?: string;

  // Dados Socioeconômicos
  profissao?: string;
  ocupacao?: string;
  situacaoTrabalhista: 'empregado' | 'desempregado' | 'autonomo' | 'aposentado' | 'pensionista' | 'estudante' | 'do_lar' | 'outros';
  rendaFamiliar?: 'ate_1_salario' | '1_a_2_salarios' | '2_a_3_salarios' | '3_a_5_salarios' | 'acima_5_salarios' | 'nao_informado';
  escolaridade: 'nao_alfabetizado' | 'fundamental_incompleto' | 'fundamental_completo' | 'medio_incompleto' | 'medio_completo' | 'superior_incompleto' | 'superior_completo' | 'pos_graduacao';
  raca: 'branca' | 'preta' | 'parda' | 'amarela' | 'indigena' | 'nao_declarado';

  // Informações Médicas Detalhadas
  tipoSanguineo?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'nao_informado';
  fatorRh?: 'positivo' | 'negativo' | 'nao_informado';
  peso?: number;
  altura?: number;
  doador: 'orgaos' | 'sangue' | 'medula' | 'nao_doador' | 'nao_informado';

  // Histórico Médico
  alergias?: string;
  alergiasMedicamentos?: string;
  medicamentosUso?: string;
  condicoesMedicas?: string;
  cirurgiasAnteriores?: string;
  hospitalizacoesAnteriores?: string;
  historicoFamiliar?: string;
  deficiencias?: string;
  limitacoesFisicas?: string;

  // Hábitos e Estilo de Vida
  tabagismo: 'nao_fumante' | 'fumante' | 'ex_fumante';
  quantidadeCigarrosDia?: number;
  tempoTabagismo?: string;
  etilismo: 'nao_bebe' | 'social' | 'frequente' | 'problematico';
  frequenciaAlcool?: string;
  usoSubstancias?: string;
  atividadeFisica: 'sedentario' | 'leve' | 'moderada' | 'intensa';
  frequenciaExercicio?: string;

  // Contatos de Emergência (múltiplos)
  contatoEmergencia1_nome?: string;
  contatoEmergencia1_parentesco?: string;
  contatoEmergencia1_telefone?: string;
  contatoEmergencia1_endereco?: string;

  contatoEmergencia2_nome?: string;
  contatoEmergencia2_parentesco?: string;
  contatoEmergencia2_telefone?: string;
  contatoEmergencia2_endereco?: string;

  // Informações do SUS/Convênio Detalhadas
  tipoAtendimento: 'sus' | 'convenio' | 'particular';
  numeroCartaoSus?: string;
  validadeCartaoSus?: string;
  convenio?: string;
  numeroCarteirinha?: string;
  validadeConvenio?: string;
  planoBeneficiario?: string;
  carenciaConvenio?: string;
  coparticipacao?: boolean;

  // Dados Administrativos
  dataHoraCadastro?: string;
  usuarioCadastro?: string;
  unidadeCadastro?: string;
  motivoConsulta?: string;
  encaminhamento?: string;
  medicalReferencia?: string;
  prioridade?: 'normal' | 'prioritario' | 'urgente';
  observacoes?: string;
  autorizaContato: boolean;
  autorizaDivulgacaoImagem: boolean;

  // Campos de Controle
  ativo: boolean;
  dataUltimaAtualizacao?: string;
  numeroRegistro?: string;
}