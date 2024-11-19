import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ImageUpload from "../image-upload";

// Definição do esquema de validação
const formSchema = z.object({
  descricao: z.string().min(2, "Descrição é obrigatória").max(50, "Máximo de 50 caracteres"),
  status: z.enum(["ABERTA", "CONCLUIDA"]),
  clienteId: z.string().min(1, "Cliente é obrigatório"),
  colaboradorId: z.string().min(1, "Colaborador é obrigatório"),
  fotos: z.string().array().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<{ id: string; nome: string }[]>([]);
  const [colaboradores, setColaboradores] = useState<{ id: string; nome: string }[]>([]);

  // Inicializando o formulário com a validação
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      status: "ABERTA",
      clienteId: "",
      colaboradorId: "",
      fotos: [],
    },
  });

  // Função para carregar as opções de clientes e colaboradores
  useEffect(() => {
    async function fetchOptions() {
      try {
        const [clientesRes, colaboradoresRes] = await Promise.all([
          axios.get("http://localhost:3000/api/clientes"),
          axios.get("http://localhost:3000/api/colaboradores"),
        ]);
        setClientes(clientesRes.data.clientes || []);
        setColaboradores(colaboradoresRes.data.colaboradores || []);
      } catch (error) {
        toast.error("Erro ao carregar clientes ou colaboradores.");
        console.error(error);
      }
    }
    fetchOptions();
  }, []);

  // Função para lidar com o upload de fotos
  const handleUploadComplete = (url: string) => {
    form.setValue("fotos", [...(form.getValues("fotos") || []), url]);
  };

  // Função para enviar os dados do formulário
  async function onSubmit(values: FormData) {
    setLoading(true);

    try {
      const payload = {
        descricao: values.descricao,
        status: values.status,
        clienteId: parseInt(values.clienteId, 10), // Corrigindo a conversão de ID
        colaboradorId: parseInt(values.colaboradorId, 10), // Corrigindo a conversão de ID
        fotos: values.fotos,
      };
      const { data } = await axios.post("http://localhost:3000/api/atividades", payload);
      toast.success("Atividade criada com sucesso!");
      console.log("Atividade criada:", data);
      form.reset();
    } catch (err) {
      console.error("Erro ao criar atividade:", err);
      toast.error("Erro ao criar a atividade. Tente novamente.");
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
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição da atividade" {...field} />
                    </FormControl>
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
                        <SelectItem value="ABERTA">ABERTA</SelectItem>
                        <SelectItem value="CONCLUIDA">CONCLUIDA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clienteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colaboradorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colaborador</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um colaborador" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colaboradores.map((colaborador) => (
                          <SelectItem key={colaborador.id} value={colaborador.id}>
                            {colaborador.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageUpload onUploadComplete={handleUploadComplete} />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Enviando..." : "Criar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
