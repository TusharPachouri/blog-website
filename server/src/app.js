import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.json({
    message:"apple"
  });
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



export { app };