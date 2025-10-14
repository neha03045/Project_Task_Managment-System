import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Convert PORT to number safely
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
