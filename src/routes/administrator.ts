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
  "/administrators/:company_id",
  async (req: express.Request, res: express.Response) => {
    const result = await getAdministrators(req.params.company_id);
    return result
      ? res.send({ success: true, result })
      : res.send({ success: false });
  }
);

route.get(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await getAdministratorById(req.params.id);
    return result
      ? res.send({ success: true, result })
      : res.send({ success: false });
  }
);

route.post(
  "/administrator",
  async (req: express.Request, res: express.Response) => {
    const result = await insertAdministrator(req.body);
    return result
      ? res.send({ success: true, message: result.message })
      : res.send({ success: false });
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
    return result
      ? res.send({ status: "Success" })
      : res.send({ status: "Failed" });
  }
);

route.delete(
  "/administrator/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await deleteAdministrator(req.params.id);
    return result
      ? res.send({ status: "Success" })
      : res.send({ status: "Failed" });
  }
);

module.exports = route;
