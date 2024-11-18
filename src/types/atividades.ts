
  export interface AtividadeData {
    id?: number;
    descricao: string;
    status: "ABERTA" | "CONCLUIDA";
    colaboradorId: number;
    clienteId: number;
    fotos?: Array<string>;
    createdAt: string;
    updatedAt: string;
    colaborador: {
      id: number;
      nome: string;
      cargo: string;
      email: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
    cliente: {
      id: number;
      nome: string;
      empresa: string;
      contatoPrincipal: string;
      email: string;
      telefone: string;
      createdAt: string;
      updatedAt: string;
    };
  };