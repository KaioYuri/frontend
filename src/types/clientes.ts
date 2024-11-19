export interface ClienteData {
    id: number;
    nome: string;
    empresa: string;
    contatoPrincipal: string;
    email: string;
    telefone: string;
    atividades?: Array<string>;
  };