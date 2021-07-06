require("dotenv").config();
import express from "express";
const app = express();
const company = require("./routes/company");
const employee = require("./routes/employee");
const administrator = require("./routes/administrator");
const news = require("./routes/news");
const login = require("./routes/login");
const { SERVER_PORT, SERVER_HOST } = process.env;

app.use(express.json(), login, company, employee, administrator, news);

app.get("*", (req: express.Request, res: express.Response) => {
  return res.send("404 | Not found!");
});

app.listen(SERVER_PORT, () =>
  console.log(`Server running @ ${SERVER_HOST}:${SERVER_PORT}`)
);
