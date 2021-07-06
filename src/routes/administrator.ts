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
    const { company_id } = req.params;
    const result = await getAdministrators(company_id);
    return res.send(result);
  }
);

route.get(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await getAdministratorById(id);
    return res.send(result);
  }
);

route.post(
  "/administrator",
  async (req: express.Request, res: express.Response) => {
    const { email_address, first_name, last_name, position } = req.body;
    if (!email_address) return res.send("Email address is empty.");
    if (!first_name) return res.send("First name is empty.");
    if (!last_name) return res.send("Last name is empty.");
    if (!position) return res.send("Position is empty.");

    const result = await insertAdministrator(req.body);
    return res.send(result);
  }
);

route.put(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const { email_address, first_name, last_name, position } = req.body;
    if (!email_address) return res.send("Email address is empty.");
    if (!first_name) return res.send("First name is empty.");
    if (!last_name) return res.send("Last name is empty.");
    if (!position) return res.send("Position is empty.");

    const { id } = req.params;

    const result = await updateAdministrator(id, req.body);
    return result ? res.send({ success: true }) : res.send({ success: false });
  }
);

route.put(
  "/administrator/restore/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await updateAdministratorByStatus(id);
    return res.send(result);
  }
);

route.delete(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await deleteAdministrator(id);
    return res.send(result);
  }
);

module.exports = route;
