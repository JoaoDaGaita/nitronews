"use client"


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "./components/ui/use-toast";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

interface UserResponse {
  erro: boolean
  tipoErro: string
}

const createUserFormSchema = z.object({
  nome: z.string().min(1, {message: "Nome é obrigatório"}),
  email: z.string().min(1,{message: "Email é obrigatório"}).email({message: "Email inválido"}),
  senha: z.string().min(8, {message: "Senha é obrigatório"}).regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$"), 
            {message: " Mínimo de 1 caractere minusculo; Mínimo de 1 caractere maiúsculo; Mínimo de um numeral"}),
  confirmacaoSenha: z.string().min(1, {message: "Confirmação Senha é obrigatório"})
})
.superRefine(({ confirmacaoSenha, senha }, ctx) => {
  if (confirmacaoSenha !== senha) {
    ctx.addIssue({
      code: "custom",
      message: " Deve ser idêntico ao campo **Senha**",
      path: ['confirmPassword']
    });
  }
})

export default function Home() {
  const [userResponse, setUserResponse] = useState<UserResponse>()
  const { toast } = useToast()

  type createUserFormData = z.infer<typeof createUserFormSchema>
  const {handleSubmit, register, reset, formState: { errors }} = useForm<createUserFormData>({
      resolver: zodResolver(createUserFormSchema)
  }) 

  async function handleOnSubmit(dataRequest: createUserFormData) {
    const response = await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify(dataRequest),
      headers: {
        "x-api-key": "ECA1AB4CE8583613A2C759B445E98",
        "Content-Type": "application/json"
      }
      
    })
    const data = await response.json()
    setUserResponse(data)
    reset({
      confirmacaoSenha: "",
      email: "",
      nome: "",
      senha: ""
    })
  }

  return (
    <>
      <div>
        <header className="bg-[#232129] w-full h-[144px] flex items-center px-32 py-0"></header>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col items-center gap-4 max-w-80 mt-8 mx-auto mb-0">
          <h1 className="text-4xl text-orange-400 font-semibold">Nitronews</h1>
          <Input placeholder="Nome" {...register("nome")} error={errors.nome} />
          <Input placeholder="e-mail" {...register("email")} error={errors.email} />
          <Input placeholder="Senha" {...register("senha")} error={errors.senha} />
          <Input placeholder="Confirmar Senha" {...register("confirmacaoSenha")} error={errors.confirmacaoSenha}/>

          <Button title={"Salvar"} onClick={() => {
            {userResponse?.erro === true
              ? 
              toast({
                description: `${userResponse?.tipoErro}`,
                variant: "destructive"
              })
              :
              toast({
                description: "Sucesso"
              })
          }
      }}  />
        </form>
      </div>
    </>
  );
}
