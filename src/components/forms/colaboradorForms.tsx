"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importando o Select

// Definição do esquema de validação para colaborador, sem o telefone
const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório").max(50, "Máximo de 50 caracteres"),
  cargo: z.string().min(2, "Cargo é obrigatório"),
  email: z.string().email("Formato de e-mail inválido"),
  status: z.string().min(1, "Status é obrigatório"), // Adicionando o campo de status
});

type FormData = z.infer<typeof formSchema>;

export function ColaboradorForm() {
  const [loading, setLoading] = useState(false);

  // Inicializando o formulário com a validação
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cargo: "",
      email: "",
      status: "", // Campo de status no estado inicial
    },
  });

  // Função para enviar os dados do formulário
  async function onSubmit(values: FormData) {
    setLoading(true);

    try {
      const payload = {
        nome: values.nome,
        cargo: values.cargo,
        email: values.email,
        status: values.status, // Incluindo status no payload
      };
      const { data } = await axios.post("http://localhost:3000/api/colaboradores", payload);
      toast.success("Colaborador criado com sucesso!");
      console.log("Colaborador criado:", data);
      form.reset();
    } catch (err) {
      console.error("Erro ao criar colaborador:", err);
      toast.error("Erro ao criar o colaborador. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm mt-6">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro de Colaborador</CardTitle>
          <CardDescription>Cadastre um novo colaborador.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do colaborador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input placeholder="Cargo do colaborador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail do colaborador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Substituindo o campo de status com Select */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ATIVO">Ativo</SelectItem>
                          <SelectItem value="INATIVO">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Enviando..." : "Cadastrar Colaborador"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
