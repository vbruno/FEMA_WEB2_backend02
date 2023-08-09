import express from "express";

import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

// tratamento de rotas de erro ou não encontradas
app.use(
  (
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
  }
);

app.listen(3333, () => {
  console.log("Server Running!");
});
