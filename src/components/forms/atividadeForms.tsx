import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ImageUpload from "../image-upload";

const formSchema = z.object({
  descricao: z.string().min(2, "Descrição é obrigatória").max(50, "Máximo de 50 caracteres"),
  status: z.enum(["ABERTO", "CONCLUIDO"]),
  cliente: z.string().min(2, "Cliente é obrigatório").max(50, "Máximo de 50 caracteres"),
  colaborador: z.string().min(2, "Colaborador é obrigatório").max(50, "Máximo de 50 caracteres"),
  foto: z.string().optional(),
});

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      status: "ABERTO",
      cliente: "",
      colaborador: "",
      foto: "",
    },
  });

  const handleUploadComplete = (url: string) => {
    setImageURL(url);
    form.setValue("foto", url); // Atualiza o campo "foto" com a URL da imagem
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/atividades", values); // Altere para o endpoint correto
      console.log("Atividade criada:", response.data);
      alert("Atividade criada com sucesso!");
      form.reset(); // Limpa o formulário após o envio
      setImageURL(null);
    } catch (err) {
      console.error("Erro ao criar atividade:", err);
      setError("Erro ao criar a atividade. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm mt-6">
        <CardHeader>
          <CardTitle className="text-2xl">Atividade</CardTitle>
          <CardDescription>Registre uma nova Atividade.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição da atividade" {...field} />
                      </FormControl>
                      <FormDescription>Descreva a atividade.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ABERTO">ABERTO</SelectItem>
                          <SelectItem value="CONCLUIDO">CONCLUIDO</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormDescription>Nome do cliente.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colaborador"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colaborador</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do colaborador" {...field} />
                      </FormControl>
                      <FormDescription>Nome do colaborador.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ImageUpload onUploadComplete={handleUploadComplete} />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Criar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
