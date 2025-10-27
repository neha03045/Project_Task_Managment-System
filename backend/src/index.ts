import dotenv = require("dotenv");
import express = require("express");
import cors = require("cors");
import router from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/routes/authRoutes", router);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});

