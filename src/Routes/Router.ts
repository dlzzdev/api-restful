import { Router, Request, Response } from "express";
import { createUser } from "../controllers/userControllers";
import { validate } from "../middleware/handleValidation";
import { userCreateValidation } from "../middleware/userValidation";

const router = Router();

export default router
  .get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
  })
  .post("/users", userCreateValidation(), validate, createUser);
