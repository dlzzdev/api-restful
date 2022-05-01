import bcrypt from "bcrypt";

export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, 10);
}

export async function compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}