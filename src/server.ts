import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/feed", async (request, response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  response.json(posts);
});

app.post("/post", async (request, response) => {
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

app.put("/publish/:id", async (request, response) => {
  const { id } = request.params;

  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  });

  response.json(post);
});

app.delete("/user/:id", async (request, response) => {
  const { id } = request.params;

  const user = await prisma.user.delete({
    where: { id },
  });

  response.json(user);
});

app.listen(3333, () => {
  console.log("Server Running!");
});
