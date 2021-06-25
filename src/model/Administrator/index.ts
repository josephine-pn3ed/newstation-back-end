import { Table, Email, Payload, Id, Role_Id } from "./types";

const db = require("../../../db");

module.exports = {
  getAdministrators: async (table: Table, id: Id, role_id: Role_Id) => {
    const data = await db
      .table(table)
      .filter({ company_id: id, role_id: role_id })
      .run();
    return data;
  },
  getAdministratorById: async (table: Table, id: Id) => {
    const data = await db.table(table).get(id).run();
    return data;
  },
  getAdministratorByEmail: async (
    table: Table,
    email: Email,
    role_id: Role_Id
  ) => {
    const data = await db
      .table(table)
      .filter({ user_email_address: email, role_id: role_id })
      .run();
    return data;
  },
  getAdministratorByEmailAndStatus: async (
    table: Table,
    email: Email,
    role_id: Role_Id
  ) => {
    const data = await db
      .table(table)
      .filter({
        user_email_address: email,
        role_id: role_id,
        user_status: "Active",
      })
      .run();
    return data;
  },
  insertAdministrator: async (table: Table, payload: Payload) => {
    const data = await db.table(table).insert(payload).run();
    return data;
  },
  updateAdministrator: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
  updateAdministratorByStatus: async (
    table: Table,
    id: Id,
    payload: Payload
  ) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
  deleteAdministrator: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
};
