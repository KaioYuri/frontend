import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";

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
} from '@/components/ui/card'

import ImageUpload from "../image-upload";
import { useState } from "react";


const formSchema = z.object({
  descricao: z.string().min(2).max(50),
  status: z.enum(["ABERTO", "CONCLUIDO"]),
  cliente: z.string().min(2).max(50),
  colaborador: z.string().min(2).max(50),
  foto: z.string().min(2).max(50),
})

export function ProfileForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      status: "ABERTO",
      cliente: "",
      colaborador: "",
      foto: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  };

  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleUploadComplete = (url: string) => {
    setImageURL(url);
  };
  return (
    <div className="flex min-h-[70vh] h-full w-full items-center justify-center px-4">
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Atividade</CardTitle>
        <CardDescription>
          Registre uma nova Atividade.
        </CardDescription>
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Descreva a atividade.
              </FormDescription>
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Nome do cliente.
              </FormDescription>
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Nome do colaborador.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageUpload onUploadComplete={handleUploadComplete} />
        <Button type="submit">Criar</Button>
        </div>
      </form>
    </Form>
    </CardContent>
  </Card>
  </div>
  )
}