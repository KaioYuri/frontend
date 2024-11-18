export interface AtividadeData {
    id?: number;                    // Id da atividade
    descricao: string;              // Descrição da atividade
    clienteId: string;              // Id do cliente
    colaboradorId: string;          // Id do colaborador
    status: 'ABERTA' | 'CONCLUIDA'; // Status da atividade , somente ABERTA ou CONCLUIDA
    fotos?: Array<string>;          // Lista de atividades associadas ao Atividade (opcional na criação)
  }
  