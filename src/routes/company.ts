import express = require("express");
const route = express.Router();
const {
  getCompany,
  insertCompany,
  updateCompany,
  deleteCompany,
} = require("../controller/Company");

route.get(
  "/company/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await getCompany(id);
    return res.send(result);
  }
);

route.post("/company", async (req: express.Request, res: express.Response) => {
  if (!req.body) return res.send("Invalid credentials.");
  const { email_address, name, password } = req.body;
  if (!email_address) return res.send("Email address is empty.");
  if (!name) return res.send("Name is empty.");
  if (!password) return res.send("Password is empty.");

  const result = await insertCompany(req.body);
  return res.send(result);
});

route.put(
  "/company/:id",
  async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.send("Invalid credentials.");
    const { email_address, name, password } = req.body;
    if (!email_address) return res.send("Email address is empty.");
    if (!name) return res.send("Name is empty.");
    if (!password) return res.send("Password is empty.");

    const { id } = req.params;
  
    const result = await updateCompany(id, req.body);
    return res.send(result);
  }
);

route.delete(
  "/company/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await deleteCompany(id);
    return res.send(result);
  }
);

module.exports = route;
