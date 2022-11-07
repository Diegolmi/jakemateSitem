import express from "express";
import indexRouter from "./routes/router.js";
import register from "./routes/register.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import cookieParser from "cookie-parser";
import bcryptjs from "bcryptjs";

dotenv.config({ path: "./env/.env" });

const port = process.env.PORT || 3000;

const app = express();

//motor de plantillas

app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3001",
}));

//routes
app.use(indexRouter);
app.use(register);

app.get("/compare", (req, res) => {

  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync("123456", salt);
  console.log(hash);
  let compare =  bcryptjs.compareSync("123456", hash); // true
    if (compare) {
      res.json('ok')
    } else {
      res.json('no')
    }
  
})


app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
