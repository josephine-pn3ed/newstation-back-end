import { Table, Payload, Id } from "./types";

const db = require("../../../db");

module.exports = {
  getNewsByCompany: async (table: Table, id: Id) => {
    const data = await db
      .table("News")
      .filter({ company_id: id, news_status: "Active" })
      .orderBy(db.desc("updated_at"))
      .innerJoin(db.table("Users"), (news: any, user: any) => {
        return news("user_id").eq(user("id"));
      })
      .zip()
      .run();
    return data;
  },
  getNewsById: async (table: Table, id: Id) => {
    const data = await db.table(table).get(id).run();
    return data;
  },
  insertNews: async (table: Table, payload: Payload) => {
    const data = await db.table(table).insert(payload).run();
    return data;
  },
  updateNews: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
  deleteNews: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
};
