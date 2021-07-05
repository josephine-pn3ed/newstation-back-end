import express = require("express");
const route = express.Router();
const { login } = require("../controller/Login");

route.post("/login", async (req: express.Request, res: express.Response) => {
  const response = await login(req.body);
  return res.send(response);
});

module.exports = route;
