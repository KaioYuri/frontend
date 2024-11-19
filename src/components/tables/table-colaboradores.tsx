"use client";

import { useEffect, useState } from "react";
import { colaboradoresService } from "@/services/colaboradoresService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Definindo o tipo da resposta da API
type ColaboradorData = {
  id: number;
  nome: string;
  cargo: string;
  email: string;
  status: string;
};

type ColaboradoresResponse = {
  message: string;
  colaboradores: ColaboradorData[];
};

export function ColaboradoresTable() {
  const [colaboradores, setColaboradores] = useState<ColaboradorData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    async function fetchColaboradores() {
      try {
        const data: ColaboradoresResponse = await colaboradoresService.getAll();
        if (Array.isArray(data.colaboradores)) {
          setColaboradores(data.colaboradores);
        } else {
          console.error("Esperado um array de colaboradores, mas recebeu:", data.colaboradores);
        }
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error);
      }
    }
    fetchColaboradores();
  }, []);

  const filteredColaboradores = colaboradores.filter((colaborador) => {
    const matchesSearchQuery =
      colaborador.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colaborador.cargo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter
      ? colaborador.status.toLowerCase() === statusFilter.toLowerCase()
      : true; // Se não houver filtro, aceita qualquer status

    return matchesSearchQuery && matchesStatus;
  });

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Colaboradores</h1>
            <form className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <Input
                  id="search"
                  placeholder="Buscar por nome ou cargo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="filter">
                  <AccordionTrigger className="text-base font-medium">Filtrar por Status</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox
                          checked={statusFilter === ""}
                          onCheckedChange={() => setStatusFilter("")}
                        />
                        Todos
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox
                          checked={statusFilter === "ATIVO"}
                          onCheckedChange={() => setStatusFilter("ATIVO")}
                        />
                        Ativo
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox
                          checked={statusFilter === "INATIVO"}
                          onCheckedChange={() => setStatusFilter("INATIVO")}
                        />
                        Inativo
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </div>
          <div className="grid gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Lista de Colaboradores</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Filtros e busca aplicados dinamicamente.
                </p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColaboradores.length > 0 ? (
                  filteredColaboradores.map((colaborador) => (
                    <TableRow key={colaborador.id}>
                      <TableCell>{colaborador.nome}</TableCell>
                      <TableCell>{colaborador.cargo}</TableCell>
                      <TableCell>{colaborador.email}</TableCell>
                      <TableCell>{colaborador.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Nenhum colaborador encontrado.
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
