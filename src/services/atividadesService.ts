import axios from "axios";
import { AtividadeData } from "@/types/atividades";

const API_URL = "http://localhost:3000/api/atividades";

export const atividadesService = {
  async getAll(): Promise<AtividadeData[]> {
    try {
      const response = await axios.get<AtividadeData[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<AtividadeData> {
    try {
      const response = await axios.get<AtividadeData>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar atividade com ID ${id}:`, error);
      throw error;
    }
  },

  async create(data: AtividadeData): Promise<AtividadeData> {
    try {
      const response = await axios.post<AtividadeData>(API_URL, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      throw error;
    }
  },

  async update(id: number, data: Partial<AtividadeData>): Promise<AtividadeData> {
    try {
      const response = await axios.put<AtividadeData>(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar atividade com ID ${id}:`, error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar atividade com ID ${id}:`, error);
      throw error;
    }
  },
};
