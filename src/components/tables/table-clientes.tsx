"use client";

import { useEffect, useState } from "react";
import { clientesService } from "@/services/clientesService";
import { ClienteData } from "@/types/clientes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type ClientesResponse = {
  message: string;
  clientes: ClienteData[];
};

export function ClientesTable() {
  const [clientes, setClientes] = useState<ClienteData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchClientes() {
      try {
        const { clientes } = await clientesService.getAll();
        setClientes(clientes);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    }

    fetchClientes();
  }, []);

  // Função para aplicar a busca
  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch =
      cliente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.contatoPrincipal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.telefone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
            <form className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <Input
                  id="search"
                  placeholder="Buscar por nome, empresa, e-mail, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="grid gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Lista de Clientes</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Filtros e busca aplicados dinamicamente.
                </p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Contato Principal</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.length > 0 ? (
                  filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>{cliente.nome}</TableCell>
                      <TableCell>{cliente.empresa}</TableCell>
                      <TableCell>{cliente.contatoPrincipal}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell>{cliente.telefone}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhum cliente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
