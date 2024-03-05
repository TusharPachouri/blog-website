import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;
connectDB();
