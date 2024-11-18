"use client";

import { useEffect, useState } from "react";
import { atividadesService } from "@/services/atividadesService";
import { AtividadeData } from "@/types/atividades";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export function AtividadesTable() {
  const [atividades, setAtividades] = useState<AtividadeData[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ABERTA" | "CONCLUIDA" | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchAtividades() {
      try {
        const data = await atividadesService.getAll();
        setAtividades(data);
      } catch (error) {
        console.error("Erro ao carregar atividades:", error);
      }
    }

    fetchAtividades();
  }, []);

  const filteredAtividades = atividades.filter((atividade) => {
    const matchesStatus = statusFilter ? atividade.status === statusFilter : true;
    const matchesQuery = searchQuery
      ? atividade.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesStatus && matchesQuery;
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
                  placeholder="Buscar por descrição..."
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto shrink-0">
                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                    Ordenar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="descricao">Descrição</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
                      <TableCell>{atividade.clienteId}</TableCell>
                      <TableCell>{atividade.colaboradorId}</TableCell>
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

function ArrowUpDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
