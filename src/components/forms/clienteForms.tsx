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

// Definição do esquema de validação para cliente
const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório").max(50, "Máximo de 50 caracteres"),
  empresa: z.string().min(2, "Empresa é obrigatória"),
  contatoPrincipal: z.string().min(2, "Contato principal é obrigatório"),
  email: z.string().email("Formato de e-mail inválido"),
  telefone: z.string().min(10, "Telefone é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

export function ClienteForm() {
  const [loading, setLoading] = useState(false);

  // Inicializando o formulário com a validação
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      empresa: "",
      contatoPrincipal: "",
      email: "",
      telefone: "",
    },
  });

  // Função para enviar os dados do formulário
  async function onSubmit(values: FormData) {
    setLoading(true);

    try {
      const payload = {
        nome: values.nome,
        empresa: values.empresa,
        contatoPrincipal: values.contatoPrincipal,
        email: values.email,
        telefone: values.telefone,
      };
      const { data } = await axios.post("http://localhost:3000/api/clientes", payload);
      toast.success("Cliente criado com sucesso!");
      console.log("Cliente criado:", data);
      form.reset();
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
      toast.error("Erro ao criar o cliente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm mt-6">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro de Cliente</CardTitle>
          <CardDescription>Cadastre um novo cliente.</CardDescription>
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
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contatoPrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contato Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Contato principal" {...field} />
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
                      <Input placeholder="E-mail do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Enviando..." : "Cadastrar Cliente"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
