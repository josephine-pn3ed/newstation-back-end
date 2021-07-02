import { Table, Email, Payload, Id, Role_Id } from "./types";

const db = require("../../../db");

module.exports = {
  getEmployees: async (table: Table, id: Id, role_id: Role_Id) => {
    return await db
      .table(table)
      .filter({ company_id: id, role_id: role_id })
      .run();
  },
  getEmployeeById: async (table: Table, id: Id) => {
    return await db.table(table).get(id).run();
  },
  getEmployeeByEmail: async (table: Table, email: Email, role_id: Role_Id) => {
    return await db
      .table(table)
      .filter({ user_email_address: email, role_id: role_id })
      .run();
  },
  getEmployeeByEmailAndStatus: async (table: Table, email: Email, role_id: Role_Id) => {
    return await db
      .table(table)
      .filter({ user_email_address: email, role_id: role_id, user_status: "Active" })
      .run();
  },
  insertEmployee: async (table: Table, payload: Payload) => {
    return await db.table(table).insert(payload).run();
  },
  updateEmployee: async (table: Table, id: Id, payload: Payload) => {
    return await db.table(table).get(id).update(payload).run();
  },
  updateEmployeeByStatus: async (table: Table, id: Id, payload: Payload) => {
    return await db.table(table).get(id).update(payload).run();
  },
  deleteEmployee: async (table: Table, id: Id, payload: Payload) => {
    return await db.table(table).get(id).update(payload).run();
  },
};
