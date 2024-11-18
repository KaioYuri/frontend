"use client";

import { useEffect, useState } from "react";
import { atividadesService } from "@/services/atividadesService";
import { AtividadeData } from "@/types/atividades";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type AtividadesResponse = {
  message: string;
  atividades: AtividadeData[];
};

export function AtividadesTable() {
  const [atividades, setAtividades] = useState<AtividadeData[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ABERTA" | "CONCLUIDA" | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchAtividades() {
      try {
        const { atividades } = await atividadesService.getAll();
        setAtividades(atividades);
      } catch (error) {
        console.error("Erro ao carregar atividades:", error);
      }
    }

    fetchAtividades();
  }, []);

  // Função para aplicar os filtros e a busca
  const filteredAtividades = atividades.filter((atividade) => {
    const matchesStatus =
      statusFilter === "" || atividade.status === statusFilter;
    const matchesSearch =
      atividade.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atividade.cliente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atividade.colaborador.nome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Atividades</h1>
            <form className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <Input
                  id="search"
                  placeholder="Buscar por descrição, cliente ou colaborador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="filter">
                  <AccordionTrigger className="text-base">Filtrar por Status</AccordionTrigger>
                  <AccordionContent>
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
                          checked={statusFilter === "ABERTA"}
                          onCheckedChange={() => setStatusFilter("ABERTA")}
                        />
                        Aberta
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox
                          checked={statusFilter === "CONCLUIDA"}
                          onCheckedChange={() => setStatusFilter("CONCLUIDA")}
                        />
                        Concluída
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
                <h1 className="text-2xl font-bold tracking-tight">Lista de Atividades</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Filtros e busca aplicados dinamicamente.
                </p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAtividades.length > 0 ? (
                  filteredAtividades.map((atividade) => (
                    <TableRow key={atividade.id}>
                      <TableCell>{atividade.descricao}</TableCell>
                      <TableCell>{atividade.cliente.nome}</TableCell>
                      <TableCell>{atividade.colaborador.nome}</TableCell>
                      <TableCell>{atividade.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Nenhuma atividade encontrada.
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
