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
  "/employees/:company_id",
  async (req: express.Request, res: express.Response) => {
    const result = await getEmployees(req.params.company_id);
    return res.send(result);
  }
);

route.get(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await getEmployeeById(req.params.id);
    return res.send(result);
  }
);

route.post("/employee", async (req: express.Request, res: express.Response) => {
  if (!req.body) return "Invalid credentials.";
  const { email_address, first_name, last_name, position } = req.body;
  if (!email_address) return "Email address is empty.";
  if (!first_name) return "First name is empty.";
  if (!last_name) return "Last name is empty.";
  if (!position) return "Position is empty.";

  const result = await insertEmployee(req.body);
  return res.send(result);
});

route.put(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await updateEmployee(req.params.id, req.body);
    return res.send(result);
  }
);

route.put(
  "/employee/restore/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await updateEmployeeByStatus(req.params.id);
    return res.send(result);
  }
);

route.delete(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await deleteEmployee(req.params.id);
    return res.send(result);
  }
);

module.exports = route;
