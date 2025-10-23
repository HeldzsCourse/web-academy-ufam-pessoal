import express from "express";
import router from "./router/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;


app.use(express.json());
app.use(cookieParser());
app.use(session({
  genid: () => {
    return uuidv4();
  },
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na url http://localhost:${port}`);
})