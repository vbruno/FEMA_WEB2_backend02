import { Router } from "express";

import { userRouter } from "./route.user";
import { postRouter } from "./route.post";

export const routes = Router();

routes.use("/user", userRouter);
routes.use("/post", postRouter);

