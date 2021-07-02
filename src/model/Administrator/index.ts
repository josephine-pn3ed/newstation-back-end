import { Table, Email, Payload, Id, Role_Id } from "./types";

const db = require("../../../db");

module.exports = {
  getAdministrators: async (table: Table, id: Id, role_id: Role_Id) => {
    return db.table(table).filter({ company_id: id, role_id: role_id }).run();
  },
  getAdministratorById: async (table: Table, id: Id) => {
    return db.table(table).get(id).run();
  },
  getAdministratorByEmail: async (
    table: Table,
    email: Email,
    role_id: Role_Id
  ) => {
    return db
      .table(table)
      .filter({ email_address: email, role_id: role_id })
      .run();
  },
  getAdministratorByEmailAndStatus: async (
    table: Table,
    email: Email,
    role_id: Role_Id
  ) => {
    return db
      .table(table)
      .filter({
        email_address: email,
        role_id: role_id,
        status: "Active",
      })
      .run();
  },
  insertAdministrator: async (table: Table, payload: Payload) => {
    return db.table(table).insert(payload).run();
  },
  updateAdministrator: async (table: Table, id: Id, payload: Payload) => {
    return db.table(table).get(id).update(payload).run();
  },
  updateAdministratorByStatus: async (
    table: Table,
    id: Id,
    payload: Payload
  ) => {
    return db.table(table).get(id).update(payload).run();
  },
  deleteAdministrator: async (table: Table, id: Id, payload: Payload) => {
    return db.table(table).get(id).update(payload).run();
  },
};
