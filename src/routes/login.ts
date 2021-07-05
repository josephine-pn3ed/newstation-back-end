import express = require("express");
const route = express.Router();
const { login } = require("../controller/Login");

route.post("/login", async (req: express.Request, res: express.Response) => {
  if (!req.body) return "Invalid credentials.";
  const { email_address, password } = req.body;
  if (!email_address) return "Email address is empty.";
  if (!password) return "Password is empty.";

  const response = await login(req.body);
  return res.send(response);
});

module.exports = route;
