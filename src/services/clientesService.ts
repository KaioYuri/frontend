import axios from "axios";

// Define o endpoint base da API
const API_BASE_URL = "http://localhost:3000/api";

export const clientesService = {
  // Método para buscar todos os clientes
  async getAll() {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes`);
      return response.data; // Retorna os dados diretamente
    } catch (error: any) {
      console.error("Erro ao buscar clientes:", error);
      throw new Error(error.response?.data?.message || "Erro ao buscar clientes");
    }
  },

  // Método para buscar um cliente específico por ID
  async getById(clienteId: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes/${clienteId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar cliente com ID ${clienteId}:`, error);
      throw new Error(error.response?.data?.message || "Erro ao buscar cliente");
    }
  },

  // Método para criar um novo cliente
  async create(cliente: { nome: string; empresa: string; email: string; telefone: string }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/clientes`, cliente);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar cliente");
    }
  },

  // Método para atualizar um cliente existente
  async update(clienteId: number, cliente: { nome?: string; empresa?: string; email?: string; telefone?: string }) {
    try {
      const response = await axios.put(`${API_BASE_URL}/clientes/${clienteId}`, cliente);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao atualizar cliente com ID ${clienteId}:`, error);
      throw new Error(error.response?.data?.message || "Erro ao atualizar cliente");
    }
  },

  // Método para deletar um cliente
  async delete(clienteId: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/clientes/${clienteId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao deletar cliente com ID ${clienteId}:`, error);
      throw new Error(error.response?.data?.message || "Erro ao deletar cliente");
    }
  },
};
