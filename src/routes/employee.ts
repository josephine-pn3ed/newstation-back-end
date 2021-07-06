import express = require("express");
const route = express.Router();
const {
  getEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployee,
  updateEmployeeByStatus,
  deleteEmployee,
} = require("../controller/Employee");

route.get(
  "/employee/company/:company_id",
  async (req: express.Request, res: express.Response) => {
    const { company_id } = req.params;
    const result = await getEmployees(company_id);
    return res.send(result);
  }
);

route.get(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await getEmployeeById(id);
    return res.send(result);
  }
);

route.post("/employee", async (req: express.Request, res: express.Response) => {
  if (!req.body) return res.send("Invalid credentials.");
  const { email_address, first_name, last_name, position } = req.body;
  if (!email_address) return res.send("Email address is empty.");
  if (!first_name) return res.send("First name is empty.");
  if (!last_name) return res.send("Last name is empty.");
  if (!position) return res.send("Position is empty.");

  const result = await insertEmployee(req.body);
  return res.send(result);
});

route.put(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.send("Invalid credentials.");
    const { email_address, first_name, last_name, position } = req.body;
    if (!email_address) return res.send("Email address is empty.");
    if (!first_name) return res.send("First name is empty.");
    if (!last_name) return res.send("Last name is empty.");
    if (!position) return res.send("Position is empty.");

    const { id } = req.params;
    const result = await updateEmployee(id, req.body);
    return res.send(result);
  }
);

route.put(
  "/employee/restore/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await updateEmployeeByStatus(id);
    return res.send(result);
  }
);

route.delete(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await deleteEmployee(id);
    return res.send(result);
  }
);

module.exports = route;
