import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.139.44.32:5000/routes/authRoutes", 
  headers: {
    "Content-Type": "application/json",
  },
});
