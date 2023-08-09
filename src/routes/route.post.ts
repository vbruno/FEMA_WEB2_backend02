import { prisma } from "../db/prismaClient";
import { Router } from "express";

export const postRouter = Router();

postRouter.get("/feed", async (request, response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  response.json(posts);
});

postRouter.post("/post", async (request, response) => {
  const { title, content, authorEmail } = request.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });

  response.json(post);
});

postRouter.put("/publish/:id", async (request, response) => {
  const { id } = request.params;

  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  });

  response.json(post);
});
