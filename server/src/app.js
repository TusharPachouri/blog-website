import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(
//   cors({
//     origin: "https://blog-website-alpha-ten.vercel.app",
//     methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
//     allowedHeaders: "X-Requested-With,content-type",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "*",
      "https://blog-website-alpha-ten.vercel.app/",
      "https://blog-website-alpha-ten.vercel.app/login",
      "https://blog-website-alpha-ten.vercel.app/profile",
      "https://blog-website-alpha-ten.vercel.app",
      "http://localhost:5173",
      "https://blog-website-tushar-pachouris-projects.vercel.app/",
      "https://vercel.com/tushar-pachouris-projects/blog-website/DTYHxjoaSAcRuEJVAWgwHXFDLKu4",
      "https://blog-website-5qclhd8po-tushar-pachouris-projects.vercel.app/",
    ],
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    // allowedHeaders:
    //   "X-Requested-With,content-type, Authorization, x-auth-token",
  })
);
// app.options("*", cors());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routers
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import contactRouter from "./routes/contact.routes.js";

//using on
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/contacts", contactRouter);

export { app };
