import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || "supersecretjwt";
  
  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
};