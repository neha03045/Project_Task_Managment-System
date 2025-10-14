import jwt from "jsonwebtoken";

export const generateToken = (id: number) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign({ id }, secret, { expiresIn });
};
