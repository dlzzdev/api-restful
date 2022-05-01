import { Request, Response } from "express";
import User from "../models/User";
import Logger from "../../config/logger";
import { generateHash } from "../utils/bcrypt";

export async function createUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const newPassword = generateHash(password)
    const user = await User.create({
      username,
      email,
      password: newPassword,
    });
    console.log(password)
    console.log(newPassword)
    Logger.info(`User ${username} has been created`);
    res.status(201).json(user);
  } catch (e:any) {
    Logger.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}