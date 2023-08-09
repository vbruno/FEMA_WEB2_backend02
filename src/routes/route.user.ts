import { Router } from "express";
import { prisma } from "../db/prismaClient";

export const userRouter = Router();

// Essa rota deleta o usuário com o id passado como parâmetro
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

userRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const user = await prisma.user.delete({
    where: { id },
  });

  response.json(user);
});
