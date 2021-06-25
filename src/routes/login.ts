import express = require("express");
const route = express.Router();
const { login } = require("../controller/Login");

route.post("/login", async (req: express.Request, res: express.Response) => {
  const result = await login(req.body);
  return result
    ? res.send({
        success: true,
        message: result.message,
        user: result.user,
        email: result.email,
        id: result.id,
      })
    : res.send({ success: false, message: result.message });
});

module.exports = route;
