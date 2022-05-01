import { Request, Response } from "express";
import User from "../models/User";
import Logger from "../../config/logger";
import { generateHash } from "../utils/bcrypt";

export async function createUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const newPassword = await generateHash(password);
    const user = await User.create({
      username,
      email,
      password: newPassword,
    });
    Logger.info(`User ${username} has been created`);
    res.status(201).json(user);
  } catch (e: any) {
    Logger.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (e: any) {
    Logger.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (e: any) {
    Logger.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: `User id ${id} has been deleted` });
  } catch (e: any) {
    Logger.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { username, email, password } = req.body;
    const newPassword = await generateHash(password);
    await user.update({
      username,
      email,
      password: newPassword,
    });
    res.status(200).json({ message: `User id ${id} has been updated` });
  } catch (e: any) {
    Logger.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
