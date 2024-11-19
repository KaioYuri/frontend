import axios from "axios";

// Define o endpoint base da API
const API_BASE_URL = "http://localhost:3000/api";

export const colaboradoresService = {
  // Método para buscar todos os colaboradores
  async getAll() {
    try {
      const response = await axios.get(`${API_BASE_URL}/colaboradores`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar colaboradores:", error);
      throw new Error(error.response?.data?.message || "Erro ao buscar colaboradores");
    }
  },

  // Método para buscar um colaborador específico por ID
  async getById(colaboradorId: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/colaboradores/${colaboradorId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar colaborador com ID ${colaboradorId}:`, error);
      throw new Error(error.response?.data?.message || "Erro ao buscar colaborador");
    }
  },

  // Método para criar um novo colaborador
  async create(colaborador: { nome: string; cargo: string; email: string; status: string }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/colaboradores`, colaborador);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar colaborador:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar colaborador");
    }
  },

  // Método para atualizar um colaborador existente
  async update(colaboradorId: number, colaborador: { nome?: string; cargo?: string; email?: string; status?: string }) {
    try {
      const response = await axios.put(`${API_BASE_URL}/colaboradores/${colaboradorId}`, colaborador);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao atualizar colaborador com ID ${colaboradorId}:`, error);
      throw new Error(error.response?.data?.message || "Erro ao atualizar colaborador");
    }
  },

  // Método para deletar um colaborador
  async delete(colaboradorId: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/colaboradores/${colaboradorId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao deletar colaborador com ID ${colaboradorId}:`, error);
      throw new Error(error.response?.data?.message || "Erro ao deletar colaborador");
    }
  },
};
