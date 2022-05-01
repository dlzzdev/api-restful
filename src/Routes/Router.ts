import { Router, Request, Response } from "express";

const router = Router();

export default router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});