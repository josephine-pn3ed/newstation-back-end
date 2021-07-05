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
  const result = await insertCompany(req.body);
  return res.send(result);
});

route.put(
  "/company/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await updateCompany(req.params.id, req.body);
    return res.send(result);
  }
);

route.delete(
  "/company/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await deleteCompany(req.params.id);
    return res.send(result);
  }
);

module.exports = route;
