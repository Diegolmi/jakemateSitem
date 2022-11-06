import express from "express";
import indexRouter from "./routes/router.js";
import register from "./routes/register.routes.js";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({ path: "./env/.env" });

const port = process.env.PORT || 3000;

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

sequelize.authenticate().then(() => {
    console.log("Conectado a la base de datos");
})
.catch((error) => {
    console.log("Error al conectar a la base de datos", error);
});

const app = express();

//motor de plantillas

app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

//routes
app.use(indexRouter);
app.use(register);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server on port 4000");
    });

