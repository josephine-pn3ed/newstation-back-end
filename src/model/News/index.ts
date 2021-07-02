import { Table, Payload, Id } from "./types";

const db = require("../../../db");

module.exports = {
  getNewsByCompany: async (table: Table, id: Id) => {
    return await db
      .table(table)
      .filter({ company_id: id, news_status: "Active" })
      .eqJoin("user_id", db.table("Users"), { index: "id" })
      .orderBy(db.desc("updated_at"))
      .run();
  },
  getNewsById: async (table: Table, id: Id) => {
    return await db.table(table).get(id).run();
  },
  insertNews: async (table: Table, payload: Payload) => {
    return await db.table(table).insert(payload).run();
  },
  updateNews: async (table: Table, id: Id, payload: Payload) => {
    return await db.table(table).get(id).update(payload).run();
  },
  deleteNews: async (table: Table, id: Id, payload: Payload) => {
    return await db.table(table).get(id).update(payload).run();
  },
};
