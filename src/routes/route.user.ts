import { Router } from "express";
import { prisma } from "../db/prismaClient";

export const userRouter = Router();

//Retorna todos os usuarios do banco
userRouter.get("/getAll", async (request, response) => {
  const resultGetAll = await prisma.user.findMany()

  response.json(resultGetAll)
})

//Retorna um usuário especifico
userRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  // se não encontrar o usuário, retorna um erro
  if (!user) {
    return response.status(400).json({ error: "Não encontre o usuário!" });
  }

  response.json(user);
});

//Criar um usuário
userRouter.post("/insert", async (request, response) => {
  const {name, email} = request.body

  const existUser = await prisma.user.findFirst({
    where:{
      email
    }
  })

  if(existUser) {
    return response.json({erro:true, msg:"Esse usuário já existe"});
  }  

  try {
    const resultCreateUser = await prisma.user.create({
    data: {
      name,
      email
    }
  })
  response.json(resultCreateUser)
  } catch (error) {
    response.json(error)
  }
  
})

//Atualizar um usuário especifico
userRouter.put("/update/:id", async (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  const existUser = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    return response.json({ erro: true, msg: "Esse usuário não existe, favor criar esse usuario!" });
  }
 
  const resultUpdateUser = await prisma.user.update({
    where:{
      id
    },
    data:{
      name,
      email
    }
  })

  response.json(resultUpdateUser)
} )

// Essa rota deleta o usuário com o id passado como parâmetro
userRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const user = await prisma.user.delete({
    where: { id },
  });

  response.json(user);
});
