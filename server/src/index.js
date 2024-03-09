import dotenv from "dotenv";
import { app } from "./app.js";
import connect from "./db/db.js";

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 8080;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error while connecting to mongodb : ${error}`);
  });
