import { Router, Request, Response } from "express";
import { createUser, findUserById, getAllUsers, removeUser, updateUser } from "../controllers/userControllers";
import { validate } from "../middleware/handleValidation";
import { userCreateValidation, userEditValidation } from "../middleware/userValidation";

const router = Router();

export default router
  .get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
  })
  .post("/users", userCreateValidation(), validate, createUser)
  .get("/users/:id", findUserById)
  .get("/users", getAllUsers)
  .delete("/users/:id", removeUser)
  .patch("/users/:id", userEditValidation(), validate, updateUser);
