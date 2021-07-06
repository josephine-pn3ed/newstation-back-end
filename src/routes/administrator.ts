import express = require("express");
const route = express.Router();
const {
  getAdministrators,
  getAdministratorById,
  insertAdministrator,
  updateAdministrator,
  updateAdministratorByStatus,
  deleteAdministrator,
} = require("../controller/Administrator");

route.get(
  "/administrator/company/:company_id",
  async (req: express.Request, res: express.Response) => {
    const result = await getAdministrators(req.params.company_id);
    return res.send(result);
  }
);

route.get(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await getAdministratorById(req.params.id);
    return res.send(result);
  }
);

route.post(
  "/administrator",
  async (req: express.Request, res: express.Response) => {
    const result = await insertAdministrator(req.body);
    return res.send(result);
  }
);

route.put(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await updateAdministrator(req.params.id, req.body);
    return result ? res.send({ success: true }) : res.send({ success: false });
  }
);

route.put(
  "/administrator/restore/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await updateAdministratorByStatus(req.params.id);
    return res.send(result);
  }
);

route.delete(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await deleteAdministrator(req.params.id);
    return res.send(result);
  }
);

module.exports = route;
